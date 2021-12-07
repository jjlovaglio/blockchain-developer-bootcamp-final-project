// SPDX-License-Identifier: MIT

pragma solidity 0.6.5;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TokenVines Smart Contract Consensys Final Project
/// @author jjlovaglio
/// @notice This is a minimum viable prototype example for tokenizing an real asset to be fractionally owned by the purchasers of said token. In this case, a virtual representation of a vineyard.
contract TokenVines is Ownable {
    uint256[] public vineIds; // vineIds array for UI rendering

    event Log(address indexed sender, string message);

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

    mapping(uint256 => Vine) vines; // tracks vineIds -> vine details

    modifier paidEnough(uint256 _vineId) {
        require(
            msg.value >= vines[_vineId].price,
            "The amount of ether sent is lower than the price of the vine"
        );
        _;
    }

    modifier vineExists(uint256 _vineId) {
        require(
            _vineId <= vineIds.length,
            "The vineId supplied does not exist."
        );
        _;
    }

    /// @notice Deploys the contract
    /// @dev Initializes a prototype vineyard of 20 vines @ 10 eth per vine
    constructor() public {
        createVineyard();
    }

    /// @notice Returns the total number of vines in the vineyard
    function getVineCount() public view returns (uint256) {
        return vineIds.length;
    }

    /// @dev Returns an array containing all vineIds
    function getVineIds() public view returns (uint256[] memory) {
        return vineIds;
    }

    /// @notice Places a vine for sale
    /// @param _vineId The id of a vine
    function putVineForSale(uint256 _vineId) public vineExists(_vineId) {
        Vine storage v = vines[_vineId];
        v.sale = Sale.ForSale;
    }

    /// @notice Creates a Prototype vineyard
    /// @dev All vines created are assigned to the deployer of the contract
    function createVineyard() private onlyOwner {
        uint256 numOfVines = 24;
        uint256 pricePerVines = 100000000000000000; // in wei (0.1 eth)
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

    /// @notice Allows anybody to purchase a vine from the vineyard
    /// @dev Sends the funds to the current vine Owner
    /// @param _vineId The existing ID of a vine
    function buyVine(uint256 _vineId)
        public
        payable
        paidEnough(_vineId)
        vineExists(_vineId)
    {
        address buyer = msg.sender;
        uint256 price = vines[_vineId].price;
        // Update Owner
        vines[_vineId].vineOwner = payable(buyer);
        // Update forSale state
        vines[_vineId].sale = Sale.NotForSale;

        // Transfer money to seller
        // this function doesn't work
        vines[_vineId].vineOwner.transfer(price);
        emit Log(msg.sender, "New Buyer!");
    }

    /// @notice Allows anybody to fetch information of a vine from the vineyard
    /// @param _vineId The existing ID of a vine
    /// @return vineId The id of the vine
    /// @return price The price of the vine in wei
    /// @return saleIs The sale status of the vine
    /// @return stateIs The physical status of the vine
    /// @return vineOwner The current owner of the vine
    function fetchVine(uint256 _vineId)
        public
        view
        vineExists(_vineId)
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
