const TokenVines = artifacts.require("TokenVines");

contract("TokenVines", function (accounts) {

  const [farmerJane, buyerJoe] = accounts;

  beforeEach( async () => {
    instance = await TokenVines.new({from: farmerJane});

  });

  it("should add farmerJane (first account) as owner using OpenZeppelin Ownable", async function () {

    assert.equal(await instance.owner({from: farmerJane}), farmerJane);
  });

  it("farmerJane (Owner) can create a vineyard with 10 vines, each @ 100 price", async() => {

     let v = await instance.createVineyard(10,100, {from: farmerJane});
     let r = await instance.fetchVine(1, {from: farmerJane});
     let c = await instance.vineCount({from: farmerJane});

    assert.equal(r.vineId.toNumber(), 1, "vineId should be one");
    assert.equal(r.price.toNumber(),100, "price should be 100" );
    assert.equal(c.toNumber(), 10, "vineCount should be 10");
  });

  it("farmerJane (Owner) can add a Vine to the vineyard", async () => {
    await instance.addVine(200, {from: farmerJane});
    let c = await instance.vineCount({from: farmerJane});
    assert.equal(c.toNumber(), 1, "vineCount should be 1");

  });

    it("buyerJoe can buy a vine ", async () => {

      // owner (accounts[0]) adds a vine of price 20
      let v = await instance.createVineyard(10,200, {from: farmerJane})
      // buyer (accounts[1]) buys a vine
      await instance.buyVine(1, {from: buyerJoe, value: 300 });
      // fetch bought vine
      let r = await instance.fetchVine(1);

      assert.equal(r.buyer, buyerJoe, "buyer should be accounts[1]")
      assert.equal(r.seller, farmerJane, "seller shoud be accounts[0]")

    })
    it("buyerJoe cannot add a vine ", async () => {

      try {
        let r = await instance.addVine(200, {from: buyerJoe})
        
      } catch (err) { }

      const r = await instance.vineCount.call();

      assert.equal(r.toNumber(), 0, "vineCount was not changed!");

    })
    it("buyerJoe cannot add a vineyard ", async () => {

      try {
        let r = await instance.addVineyard(10,200, {from: buyerJoe})
        
      } catch (err) { }

      const r = await instance.vineCount.call();

      assert.equal(r.toNumber(), 0, "vineCount was not changed!");

    })


  // it("should not let someone else change the owner variable", async () => {
  //   // will destructure accounts and give them variable names
  //   const [ owner, badJoe ] = accounts;

  //   // deploys a new instance, passing an argument (42 in this case)
  //   const tvInstance = await TokenVines.new(42, {from: owner });

  //   try {
  //     await tvInstance.setStoredData(22, {from: badJoe });
  //   } catch (err) { }

  //   const storedData = await tvInstance.getStoredData.call();

  //   assert.equal(storedData, 42, "storedData was not changed!");
      
    


  // });

  // it("should display the balance of the owner's account", async () => {

  //   const balance = await web3.eth.getBalance(accounts[0]);
  //   console.log(`owner's balance (in gwei): ${balance}`);


  // });


});
