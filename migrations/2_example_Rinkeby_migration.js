const TokenVines=artifacts.require("TokenVines");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(TokenVines,10, {from: accounts[0]});
  }

