# Tokenizing a Vineyard
## Overview

* Need to keep track of ownership for each plant in the vineyard
  * Need to keep track of n addresses equivalent to  each plant in the vineyard
    * an address array of n acquirers.
    *  address[n] public acquirers;   
* Plants have different statuses and are subject to different water treatments.
* Users need to be able to acquire a plant 

```
pragma solidity ^X.X.XX;
 
contract PlantAquisition {
 
    address[n] public acquirers;
  
    function acquire(uint plantId) 
        public 
        returns(uint) 
      {
        require(plantId >= 0 && petId <= n);
        acquirers[plantId] = msg.sender;
        return plantId;
      }
      
    function getAquirors()
        public 
        view
        returns(address[n])
      {
        return acquirers;
      }

}
```
