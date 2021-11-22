const TokenVines = artifacts.require("TokenVines");


contract("TokenVines", function (accounts) {
  it("should confirm contract is deployed", async function () {
    await TokenVines.deployed();
    return assert.isTrue(true);
  });

  it("can create a vineyard with 10 vines, each @ 100 price", async() => {
    // get the contract that has been deployed
    const i = await TokenVines.deployed();
    console.log("here acc: "+ accounts[0])
    // verify it has an initial value of 0
     let v = await i.createVineyard(10,100);
     let r = await i.fetchVine(1)


    await assert.equal(r.vineId.toNumber(), 1, "vineId should be one");
    await assert.equal(r.price.toNumber(),100, "price should be 100" );
  });

  // describe("Functionality", () => {
  //   it("should store a new value 42", async () => {
  //     // grab the contract we need
  //     const tvInstance = await TokenVines.deployed();

  //     // change the number
  //     await tvInstance.setStoredData(42, {from: accounts[0] });

  //     // make sure the 2 numbers match
  //     const storedData = await tvInstance.getStoredData.call();
  //     assert.equal(storedData, 42, `42 was not stored!`)


  //   })

  // })

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
