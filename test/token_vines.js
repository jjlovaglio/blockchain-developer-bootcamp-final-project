const TokenVines = artifacts.require("TokenVines");


contract("TokenVines", function (accounts) {
  it("should confirm contract is deployed", async function () {
    await TokenVines.deployed();
    return assert.isTrue(true);
  });

  it("can create a vineyard with 10 vines, each @ 100 price", async() => {

    const i = await TokenVines.deployed();
     let v = await i.createVineyard(10,100);
     let r = await i.fetchVine(1)

    assert.equal(r.vineId.toNumber(), 1, "vineId should be one");
    assert.equal(r.price.toNumber(),100, "price should be 100" );
  });

  describe("Function Tests", () => {
    it("buyer address can buy a vine ", async () => {
      const [farmerJane, buyerJoe] = accounts;

      const i = await TokenVines.deployed();
      // owner (accounts[0]) adds a vine of price 20
      let v = await i.createVineyard(10,200, {from: farmerJane})
      // buyer (accounts[1]) buys a vine
      await i.buyVine(1, {from: buyerJoe, value: 300 });
      // fetch bought vine
      let r = await i.fetchVine(1);

      assert.equal(r.buyer, buyerJoe, "buyer should be accounts[1]")
      assert.equal(r.seller, farmerJane, "seller shoud be accounts[0]")

    })

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
