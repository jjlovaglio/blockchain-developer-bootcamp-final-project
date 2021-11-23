
export const tvABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_vineId",
				"type": "uint256"
			}
		],
		"name": "fetchVine",
		"outputs": [
			{
				"name": "vineId",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "stateIs",
				"type": "string"
			},
			{
				"name": "seller",
				"type": "address"
			},
			{
				"name": "buyer",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "addVine",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "vineCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_vineId",
				"type": "uint256"
			}
		],
		"name": "buyVine",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	}
]