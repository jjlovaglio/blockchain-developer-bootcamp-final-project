// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TokenVines {

  uint256 public storedData;
  address owner = msg.sender;

  constructor() public {}

  function registerVineyard() public {
      // farmer registers vineyard
      // farmer provides geolocation of vineyard
      // farmer declares number of plants in the vineyard
      // farmer provides his personal information

  }

  function reportVineyardStatus() public {
      // farmer reports status:
            // when harvested
            // when grapes fermenting
            // when wine aging
            // when wine bottled
            // when wine labeled, packed & ready for pickup
  }

  function submitHarvestReport() public {
      // farmer submits report on how things went throughout the year until harvest
  }

  function submitWinemakingReport() public {
      // farmer submits report on how things went during the winemaking phase of the process
  }

  function buyVines() public {
      // buyer buys a vine
  }

  function viewAvailableVines() public {
      // buyer views vines available for sale
  }

  function claimWine() public {
      // token holder claims wine of current harvest
  }

  function putWineForSale() public {
      // token holder leaves wine for current harvest to farmer to be sold for a profit
  }


}


