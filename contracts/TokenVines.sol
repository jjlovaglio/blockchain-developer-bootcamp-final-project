// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TokenVines {

  uint256 public storedData;
  address owner = msg.sender;

  constructor(uint256 _num) public {
    storedData = _num;
  }

  function getStoredData() public view returns (uint256) {
    return storedData;
  }

  function setStoredData(uint256 x) public {
    require(msg.sender == owner, "Not the owner!");
    storedData = x;
  }


}

// TODO: write the Solidity architecture (function names and their inputs and outputs )
// TODO: merge with dev branch
// TODO: upload to github