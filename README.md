
# Final Project - mvp for Fraccionalized Asset Sale: A Vineyard

## Project Description
This dapp is a proof of concept of a virtual representation of a real world vineyard asset. The property is valued at 2.4 eth. The property is fractioned by the number of existing vines growing on it. On this example 24 vines. Anybody with an ethereum wallet can purchase a vine. Owners of a vine have can harvest the production each year in the form of one bottle of wine per year, to be redeemed at the site after august 31st each year.

#### Project Structure
```
.
├── build/                   # Truffle build 
├── contracts/               # Truffle contracts 
├── migrations/              # Truffle migrations 
├── public/                  # Frontend files
├── public/dapp.js           # dapp (vanilla Js)
├── test/                    # Automated tests 
├── app.js                   # express.js files
├── truffle-config.js        # Truffle config
└── README.md

```

## Deployed frontend url

https://springboot-heku-demo.herokuapp.com/


## Prerequisites

- Node.js >= v10
- Truffle and Ganache
- ganache-cli (for running locally) 

## How to run this project locally

- $ npm install
- $ ganache-cli -p 7557 --chainId 1875 --mnemonic "cube ring panel future project later maximum couch slush leaf lift arrest"
- [switch to new terminal]
- $ truffle-console --network ganacheCli
- [switch to new terminal]
- node app.js
- [switch to truffle console terminal]
- $ truffle migrate 
- [copy contract address to const in dapp.js]
- [copy abi from build/contracts/TokenVines.json to const in dapp.js]
- [import temporary ganache-cli account to metamask via private key]
- access or refresh http://localhost:3000

### Testing the project locally

- [switch to truffle-console terminal] 
- $ test --network ganacheCli

## Public Ethereum wallet for certification

address: `0x16A10a43B3f98CACD7Be6A72aa830561155385B0`

## Additional Features (not implemented)

- TODO: implement putVineForSale functionality for vineOwners

    - add a vineOwner's list // tracks owners?
    - add a vineOwner to vineId mapping // tracks vines to owners
    - fetch how many vines the connected owner owns
    - enable a button to put vine for sale for each owned vine

- TODO: implement listOwnedVines functionality
    - show the user their owned vines and their status

## Screencast
