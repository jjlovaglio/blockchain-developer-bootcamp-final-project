# Design Pattern Decisions


## Access Control Design Pattern

The main contract uses the Ownable module from OpenZeppelin. 

In this pattern, a single account has exclusive access to specific functions. This account (the owner) will be the the address that deploys the contract.

The `Ownable` design pattern is used in `createVineyard()` and `addVine()` functions

## Inheritance and Interfaces

The `TokenVines` contract inherits the OpenZeppelin `Ownable` contract to manage ownership.