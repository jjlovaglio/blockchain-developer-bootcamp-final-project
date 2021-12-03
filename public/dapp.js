const contract_address = '0x6b4209B2b0E913E037d1C02C00E56e55235594B0';
const contract_abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "vineIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getVineCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getVineIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vineId",
        "type": "uint256"
      }
    ],
    "name": "putVineForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_vineId",
        "type": "uint256"
      }
    ],
    "name": "buyVine",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_vineId",
        "type": "uint256"
      }
    ],
    "name": "fetchVine",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "vineId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "saleIs",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "stateIs",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

async function buildCard (vineObj) {

  let  vineRow = document.getElementById('vineRow');
  let vineCol = document.createElement('div')
  vineCol.className = "col"
  let vineCard = document.createElement('div')
  vineCard.className = "card"
  vineCard.style = ""
  
  let vineImg = document.createElement('img')
  vineImg.src = "grapes.png"
  let cardBody = document.createElement('div')
  cardBody.className = "card-body"
  let cardText = document.createElement('p')
  cardText.className = "card-text"
  cardText.innerHTML = 
      "Owner: ..." + vineObj.seller.slice(-5,) + "<br>" + 
      "Status: " + vineObj.stateIs + "<br>" +
      "Price: $" + vineObj.price + "<br>" +
      "VineId: " + vineObj.vineId
  let cardBtn = document.createElement('button')
  cardBtn.className = "btn btn-outline-success buyBtn"
  cardBtn.innerHTML = "buy"
  cardBtn.id = vineObj.vineId

  vineRow.appendChild(vineCol)
  vineCol.appendChild(vineCard)
  vineCard.appendChild(vineImg)
  vineCard.appendChild(cardBody)
  cardBody.appendChild(cardText)
  cardBody.appendChild(cardBtn)
}

async function getVineIds(contract) {
  console.log("getVineIds() called");
  const data = await contract.methods.getVineIds().call();
  console.log("vineIds: "+ data);
  return data;
}

async function getVineCount(contract) {
  console.log("getVineCount() called")
  var vineCount = await contract.methods.getVineCount().call();
  console.log("vineCount: ", vineCount);
  return vineCount;
}

async function displayAllVines(contract) {
  console.log("displayAllWines() called");

  let vineIds = await getVineIds(contract);
  await getVineCount(contract);

  var vineRowDiv = $("#vineRow");
  vineRowDiv.empty();

  // for each ID
  $.each(vineIds, function(i){
    // call the fetchVine function
    // retrieve each vine
    // use the buildCard function to create a vineCard object
    // render in the UI
    var vineStruct = fetchVine(contract, vineIds[i]);
    vineStruct.then((v) => {
      buildCard(v)
    })

  })

}

async function fetchVine(contract, vineId) {
  console.log("fetchVine() called")
  var vineStruct = await contract.methods.fetchVine(vineId).call();
  return vineStruct;
}

async function startApp() {

  const c1 = new web3.eth.Contract(contract_abi, contract_address);
  c1.setProvider(window.ethereum); 
  console.log("Connecting to metamask wallet ...");
  await ethereum.request({ method: 'eth_requestAccounts' });
  $("#mm-current-account").text("Connected to: " + ethereum.selectedAddress);


  // iterate them and make cards in UI

  
  displayAllVines(c1);
  
}

var web3;
$( document ).ready( function () {

  if (typeof window.ethereum !== 'undefined') {
    console.log("Metamask detected");
    $("#mm-detected").text("Metamask detected");
    web3 = new Web3(window.ethereum);
    // starts the app
    startApp();
  }
else {
    console.error("Metamask not available")
    $("#mm-detected").text("Metamask not available");
}

})