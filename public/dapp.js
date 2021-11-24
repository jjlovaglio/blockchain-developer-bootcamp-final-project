
import { ssABI } from "./abi.js";
import { tvABI } from "./tvAbi.js";

// Coogan's Tutorial on Web3 + Metamask Dapp
// bare - bones minimum MVP

window.addEventListener('load', function () {
  if (typeof this.window.ethereum !== 'undefined') {
    console.log("Metamask detected!")
    let mmDetected = document.getElementById('mm-detected')
    mmDetected.innerHTML = "Metamask has been detected!"

  } else {
    console.log('MetaMask is not available!')
    this.alert("You need to install Metamask or another wallet! ")
  }
})

const mmEnable = document.getElementById('mm-connect');
mmEnable.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts' })

  // once we get access, we grab the mm-current-account div 
  // and populate
  let mmCurrentAccount = document.getElementById('mm-current-account')
  mmCurrentAccount.innerHTML = "Here's your current account: " + ethereum.selectedAddress;

}

// contract Address taken from Remix (deployed on Rinkeby)
const ssAddress = '0xc4fba337e9505015cC399409249AC2737Ff88F14'
const tvAddress = '0xb57621fC940E1AbB320A36813AB1377CA07DA29A'

// contract abi from abi.js
// ssABI

const ssSubmit = document.getElementById('ss-input-button');
ssSubmit.onclick = async () => {
  const ssValue = document.getElementById('ss-input-box').value;
  console.log(ssValue);

  var web3 = new Web3(window.ethereum);

  const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)

  await simpleStorage.methods.store(ssValue).send({ from: ethereum.selectedAddress })

}

let tvGetButton = document.getElementById('tv-get-vineCount');
tvGetButton.addEventListener("click", async () => {

  var web3 = new Web3(window.ethereum);
  const tokenVinesContract = new web3.eth.Contract(tvABI, tvAddress)

  await tokenVinesContract
    .methods
    .vineCount()
    .call({ from: ethereum.selectedAddress })
    .then( (vineCount) => {

    let tvRetrieve = document.getElementById('tv-retrieve');
    tvRetrieve.innerHTML = "The current vineCount is: " + vineCount;

    });

  
    let myArray = [1,2,3,4];

    // iterate vineCount
    myArray.forEach(async element => {

       await tokenVinesContract
              .methods
              .fetchVine(element)
              .call({from: ethereum.selectedAddress})
              .then( function (vineObj) {
                
                console.log(vineObj)
                
                buildCard(vineObj)

     

              })

                

              

    });

});





function buildCard (vineObj) {

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

