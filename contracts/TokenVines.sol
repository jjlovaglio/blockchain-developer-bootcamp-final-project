// SPDX-License-Identifier: MIT

pragma solidity 0.6.5;

import "@openzeppelin/contracts/access/Ownable.sol";

// Define a contract 'Lemonade Stand'
contract TokenVines is Ownable {
    uint256 public vineCount; // total vines listed

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
        address payable seller;
        address payable buyer;
    }

    // Define a public mapping 'items' that maps the SKU (a number) to an Item.
    mapping(uint256 => Vine) vines;

    constructor() public {}

    // TODO: create putVineForSale() function
    // TODO: test all functionality in truffle develop
    // TODO: research how to handle events in front end

    function getVineIds() public view returns (uint256[] memory) {
        return vineIds;
    }

    function putVineForSale(uint256 vineId) public {
        // TODO: require msg.sender == ownerofthevine
        // fetch vine
        // change state

        Vine storage v = vines[vineId];
        v.sale = Sale.ForSale;
        v.seller = msg.sender;
    }

    function createVineyard(uint256 _count, uint256 _price)
        public
        returns (uint256)
    {
        for (uint256 i = 1; i < _count + 1; i++) {
            vineIds.push(i);
            vines[i] = Vine({
                vineId: i,
                price: _price,
                sale: Sale.ForSale,
                state: State.Harvested,
                seller: payable(owner()),
                buyer: payable(address(0))
            });

            vineCount = vineCount + 1;
        }

        return vineCount;
    }

    function buyVine(uint256 _vineId) public payable {
        address buyer = msg.sender;
        uint256 price = vines[_vineId].price;

        // TODO: create forSale modifier

        // Update Buyer
        vines[_vineId].buyer = payable(buyer);

        // Update State
        vines[_vineId].state = State.Unharvested;

        // Update Sale
        vines[_vineId].sale = Sale.NotForSale;

        // Transfer money to seller
        // this function doesn't work
        vines[_vineId].seller.transfer(price);
    }

    function fetchVine(uint256 _vineId)
        public
        view
        returns (
            uint256 vineId,
            uint256 price,
            string memory saleIs,
            string memory stateIs,
            address seller,
            address buyer
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

        seller = vines[_vineId].seller;
        buyer = vines[_vineId].buyer;
    }
}
