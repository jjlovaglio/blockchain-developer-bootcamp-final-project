//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.5.16;

// Define a contract 'Lemonade Stand'
contract TokenVines {
    // Variable: Owner
    address owner;

    // Variable: SKU count
    uint256 public vineCount;

    // Event: 'State' with value 'ForSale'
    enum State {
        Harvested,
        Unharvested
    }

    struct Vine {
        uint256 vineId;
        uint256 price;
        State state;
        address payable seller;
        address buyer;
    }

    // Define a public mapping 'items' that maps the SKU (a number) to an Item.
    mapping(uint256 => Vine) vines;

    constructor(uint256 _count) public {
        owner = msg.sender;
        vineCount = _count;
    }

    function addVine(uint256 _price) public {
        // Increment sku
        vineCount = vineCount + 1;

        // Add the new item into inventory and mark it for sale
        vines[vineCount] = Vine({
            vineId: vineCount,
            price: _price,
            state: State.Harvested,
            seller: msg.sender,
            buyer: address(0)
        });
    }

    function buyVine(uint256 _vineId) public payable {
        address buyer = msg.sender;
        uint256 price = vines[_vineId].price;

        // Update Buyer
        vines[_vineId].buyer = buyer;

        // Update State
        vines[_vineId].state = State.Unharvested;

        // Transfer money to seller
        vines[_vineId].seller.transfer(price);
    }

    function fetchVine(uint256 _vineId)
        public
        view
        returns (
            uint256 vineId,
            uint256 price,
            string memory stateIs,
            address seller,
            address buyer
        )
    {
        uint256 state;
        vineId = vines[_vineId].vineId;
        price = vines[_vineId].price;
        state = uint256(vines[_vineId].state);

        if (state == 0) {
            stateIs = "Harvested";
        }

        if (state == 1) {
            stateIs = "Unharvested";
        }

        seller = vines[_vineId].seller;
        buyer = vines[_vineId].buyer;
    }
}
