const TokenVines = artifacts.require("TokenVines");

contract("TokenVines", function (accounts) {

  const [farmerJane, buyerJoe] = accounts;

  beforeEach( async () => {
    instance = await TokenVines.new({from: farmerJane});

  });

  it("should add farmerJane (first account) as owner using OpenZeppelin Ownable", async function () {

    assert.equal(await instance.owner({from: farmerJane}), farmerJane);
  });

  it("farmerJane (Owner) can create a vineyard", async() => {

     let r = await instance.fetchVine(1, {from: farmerJane});
     let c = await instance.getVineCount({from: farmerJane});

    assert.equal(r.vineId.toNumber(), 1, "vineId should be one");
    assert.equal(r.price,web3.utils.toWei("0.1", "ether"), "price for a vine should be 0.1 eth" );
    assert.equal(c.toNumber(), 24, "vineCount should be 24");
  });

    it("buyerJoe can buy a vine ", async () => {
      // buyer (accounts[1]) buys a vine
      await instance.buyVine(1, {from: buyerJoe, value: web3.utils.toWei("10", "ether") });
      // fetch bought vine
      let r = await instance.fetchVine(1);
      assert.equal(r.vineOwner, buyerJoe, "buyer should be accounts[1]")
    })

    it("buyerJoe cannot create a vineyard ", async () => {

      try {
        let r = await instance.createVineyard({from: buyerJoe})
        
      } catch (err) { }

      const r = await instance.getVineCount.call();

      assert.equal(r.toNumber(), 24, "vineCount shouldn't change!");

    })

    it("buyerJoe cannot pay less than stipulated price for a vine", async () => {
    
      try {
        await instance.buyVine(1,
          {
            from: buyerJoe,
            to: farmerJane,
            value: web3.utils.toWei("0.09", "ether")
          })
      } catch (error) {
        assert(error, "Expected an error, but did not get one");
        assert.equal(error.reason, "The amount of ether sent is lower than the price of the vine", "The amount of ether sent cannot be lower than the price of the vine");
      }

    })

    it("buyerJoe cannot buy a vine with a vineId that does not exist", async () => {
      try {
        await instance.buyVine(333,
          {
            from: buyerJoe,
            to: farmerJane,
            value: web3.utils.toWei("0.1", "ether")
        })
        throw null;
      } catch (error) {
        assert(error, "Expected an error, but did not get one");
        assert.equal(error.reason, "The vineId supplied does not exist.");
      }

    })

})
