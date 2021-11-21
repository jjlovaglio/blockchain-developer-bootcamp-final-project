const TokenVines=artifacts.require("TokenVines");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(TokenVines,{from: accounts[0]});
  }

