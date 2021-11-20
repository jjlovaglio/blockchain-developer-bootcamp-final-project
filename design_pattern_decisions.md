# Design Pattern Decisions


## Access Control Design Pattern

The main contract uses the Ownable module from OpenZeppelin. In this pattern, a single account has exclusive access to specific functions. This account (the owner) will be the the address that deploys the contract.

## Inheritance and Interfaces

describe library inherited or interface used

Reentrancy Guard & Ownable