const TokenVines=artifacts.require("TokenVines");

module.exports = function(deployer) {
    deployer.deploy(TokenVines, 0);
  }