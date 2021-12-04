// SPDX-License-Identifier: MIT

pragma solidity 0.6.5;

import "@openzeppelin/contracts/access/Ownable.sol";

// Define a contract 'Lemonade Stand'
contract TokenVines is Ownable {
    // vineIds array for UI rendering
    uint256[] public vineIds;

    // Event: 'State' with value 'ForSale'
    enum Sale {
        NotForSale,
        ForSale
    }

    enum State {
        Unharvested,
        Harvested
    }

    struct Vine {
        uint256 vineId;
        uint256 price;
        Sale sale;
        State state;
        address payable vineOwner;
    }

    // Define a public mapping 'items' that maps the SKU (a number) to an Item.
    mapping(uint256 => Vine) vines;

    constructor() public {
        createVineyard();
    }

    function getVineCount() public view returns (uint256) {
        return vineIds.length;
    }

    function getVineIds() public view returns (uint256[] memory) {
        return vineIds;
    }

    function putVineForSale(uint256 vineId) public {
        Vine storage v = vines[vineId];
        v.sale = Sale.ForSale;
    }

    function createVineyard() private {
        uint256 numOfVines = 10;
        uint256 pricePerVines = 100;
        for (uint256 i = 1; i < numOfVines + 1; i++) {
            vineIds.push(i);
            vines[i] = Vine({
                vineId: i,
                price: pricePerVines,
                sale: Sale.ForSale,
                state: State.Unharvested,
                vineOwner: payable(owner())
            });
        }
    }

    function buyVine(uint256 _vineId) public payable {
        // TODO: paid enough modifier
        address buyer = msg.sender;
        uint256 price = vines[_vineId].price;
        // Update Owner
        vines[_vineId].vineOwner = payable(buyer);
        // Update forSale state
        vines[_vineId].sale = Sale.NotForSale;

        // Transfer money to seller
        // this function doesn't work
        vines[_vineId].vineOwner.transfer(price);
    }

    function fetchVine(uint256 _vineId)
        public
        view
        returns (
            uint256 vineId,
            uint256 price,
            string memory saleIs,
            string memory stateIs,
            address vineOwner
        )
    {
        uint256 state;
        uint256 sale;
        vineId = vines[_vineId].vineId;
        price = vines[_vineId].price;
        sale = uint256(vines[_vineId].sale);

        if (sale == 0) {
            saleIs = "NotForSale";
        }

        if (sale == 1) {
            saleIs = "ForSale";
        }

        state = uint256(vines[_vineId].state);

        if (state == 0) {
            stateIs = "Unharvested";
        }

        if (state == 1) {
            stateIs = "Harvested";
        }

        vineOwner = vines[_vineId].vineOwner;
    }
}
