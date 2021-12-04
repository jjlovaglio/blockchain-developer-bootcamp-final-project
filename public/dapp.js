const contract_address = '0xb1A8DB463BfB144c814B5d7726098fe57583d3f0';
const contract_abi =  [
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
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Log",
    "type": "event"
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
        "name": "vineOwner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

async function soldBuildCard (vineObj) {

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
  cardText.style = "color: darkgreen;"
  cardText.className = "card-text"
  cardText.innerHTML = 
      "Owner: ..." + vineObj.vineOwner.slice(-5,) + "<br>" + 
      "Sale: " + "<strong>" + vineObj.saleIs + "</strong>" + "<br>" +
      "Status: " + vineObj.stateIs + "<br>" +
      "Price: " + web3.utils.fromWei(vineObj.price, "ether" ) + " Ξ <br>" +
      "VineId: " + vineObj.vineId
  let cardBtn = document.createElement('button')
  cardBtn.className = "btn btn-secondary disabled"
  cardBtn.innerHTML = "sold"
  cardBtn.id = "btnDetailsID_" + vineObj.vineId

  vineRow.appendChild(vineCol)
  vineCol.appendChild(vineCard)
  vineCard.appendChild(vineImg)
  vineCard.appendChild(cardBody)
  cardBody.appendChild(cardText)
  cardBody.appendChild(cardBtn)
}

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
      "Owner: ..." + vineObj.vineOwner.slice(-5,) + "<br>" + 
      "Sale: "    + vineObj.saleIs + "<br>" +
      "Status: " + vineObj.stateIs + "<br>" +
      "Price: " + web3.utils.fromWei(vineObj.price, "ether" ) + " Ξ <br>" +
      "VineId: " + vineObj.vineId
  let cardBtn = document.createElement('button')
  cardBtn.className = "btn btn-outline-success buyBtn"
  cardBtn.innerHTML = "buy"
  cardBtn.id = "btnDetailsID_" + vineObj.vineId

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
      if (v.saleIs === "NotForSale") {
        soldBuildCard(v)
      } else {
        buildCard(v)
      }
    })

  })

}

async function fetchVine(contract, vineId) {
  console.log("fetchVine() called")
  var vineStruct = await contract.methods.fetchVine(vineId).call();
  return vineStruct;
}

async function alertNewBuyer(buyerAddress) {
  let myAlert = document.getElementById('myAlert')
  let myAlertB = document.getElementById('myAlertB')
  let myAlertP = document.getElementById('myAlertP')
  myAlert.className = "alert alert-success alert-dismissible fade show"
  myAlertP.innerHTML = "<strong>Transaction Successful!</strong> New buyer address: ..."+ buyerAddress.slice(-5,)
  myAlert.appendChild(myAlertP)
  myAlert.appendChild(myAlertB)
  deactivateSpinner()

}
async function deactivateSpinner() {
  let mySpin = document.getElementById('mySpin')
  mySpin.className = "text-center fade hide"
}

async function activateSpinner() {
  let mySpin = document.getElementById('mySpin')
  mySpin.className = "text-center fade show"
}

async function buyVine(contract, vineId) {
  console.log("buyVine() called for vineId: " + vineId)
  // get vine
  var v = await fetchVine(contract, vineId);
  console.log(v.vineOwner)
  console.log(v.price)

  await activateSpinner()

  // call buyVine with seller's address & price
  await contract.methods.buyVine(vineId).send(
    {
      from: ethereum.selectedAddress, 
      to: v.vineOwner,
      value: v.price
    })
    .then((x) => {
      let buyerAddress = x.events.Log.returnValues[0];
      alertNewBuyer(buyerAddress)
    })

  await displayAllVines(contract);
}

function handleButtons(contract) {
  console.log("handleButtons() called")
  $("#vineRow").on("click", "button",  async function(event){

    var vineId = event.target.id.split("_")[1];
    await buyVine(contract, vineId);

  });
}


async function startApp() {

  const c1 = new web3.eth.Contract(contract_abi, contract_address);
  c1.setProvider(window.ethereum); 
  console.log("Connecting to metamask wallet ...");
  await ethereum.request({ method: 'eth_requestAccounts' });
  $("#mm-current-account").text("Connected to: " + ethereum.selectedAddress);

  await displayAllVines(c1);
  handleButtons(c1);
  
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