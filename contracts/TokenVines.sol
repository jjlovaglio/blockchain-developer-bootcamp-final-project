// SPDX-License-Identifier: MIT

pragma solidity >=0.5.4;

import "@openzeppelin/contracts/access/Ownable.sol";

// Define a contract 'Lemonade Stand'
contract TokenVines is Ownable {
    // Variable: SKU count
    uint256 public vineCount;

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

    function putVineForSale(uint256 vineId) public {
        // fetch vine
        // change state

        Vine storage v = vines[vineId];
        v.sale = Sale.ForSale;
        v.seller = msg.sender;
    }

    function createVineyard(uint256 _count, uint256 _price) public onlyOwner {
        vineCount = _count;
        for (uint256 i = 0; i < _count; i++) {
            vines[i] = Vine({
                vineId: i,
                price: _price,
                sale: Sale.ForSale,
                state: State.Harvested,
                seller: payable(owner()),
                buyer: payable(address(0))
            });
        }
    }

    function addVine(uint256 _price) public onlyOwner {
        // Increment sku
        vineCount = vineCount + 1;
        // convert to address payable?
        address payable seller = payable(msg.sender);
        // Add the new item into inventory and mark it for sale
        vines[vineCount] = Vine({
            vineId: vineCount,
            price: _price,
            sale: Sale.ForSale,
            state: State.Harvested,
            seller: seller,
            buyer: payable(address(0))
        });
    }

    function buyVine(uint256 _vineId) public payable {
        // TODO: debug this function, it is not working
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
