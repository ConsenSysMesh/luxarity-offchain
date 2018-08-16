const Ethjs = require('ethjs')
const EthEvents = require('eth-events')
const Token = require('../build/contracts/Registry.json')

//ImpCoin:          0xe828317ca817b557184b72e094c14f759b602d51
//PLCRVoting:        0x4a4853a3102869511c263e18b9666437d17132b3
//Parameterizer:     0x73d38b6ec362297acb8be6628a221b18f84ec35a
//Registry:          0x6dbd66c23f636c39380b2ff40ac59569d6a6d63e
//just sent you 1000 IC to 0xbb011cdbfc28404baaa2d40a5ace94e9fb5695bd 

class watchEventHandler{

  constructor(){
    console.log("watchEventHandler")
  };

 async handle(event, context, cb) {

  console.log("inside createUserHandler.handle");

  // setup ethjs
const provider = new Ethjs.HttpProvider(`https://rinkeby.infura.io`)
const ethjs = new Ethjs(provider)

// abi/address of the contract to query //ImpCoin
const contract = {
  abi: Token.abi,
  address: '0x6dbd66c23f636c39380b2ff40ac59569d6a6d63e',
}

// init eth-events
const ethEvents = new EthEvents(ethjs, contract)

// block range
const fromBlock = '0'
const toBlock = 'latest'

// event name(s)
const eventNames = ['_Application']

// indexed event emission arg values (un-hashed filter topics)
//!!!don not put comments between { and filtervalues!!!
const indexedFilterValues = {
  data: 'Test Project Event'
  //listingHash: '0xbd61837be06d94e1ae9192878e518908b30a9e66e0810d1e139231d4ae17ed37'
  //_to: '0xCAFEDEADBEEF12345678912456789',
  //_to: '0x6dbd66c23f636c39380b2ff40ac59569d6a6d63e'
}

// async
try{
ethEvents.getLogs(fromBlock, toBlock, eventNames, indexedFilterValues).then(logs => {
  logs.map(log => {
    console.log(log)
    // {
    //   logData: {
    //     _value: <BN: 16bcc41e90>,
    //     _from: '0xDEADBEEFCAFE12345678912456789',
    //     _to: '0xCAFEDEADBEEF12345678912456789',
    //     _eventName: 'Transfer',
    //   },
    //   txData: {
    //     txHash: '0xBEEFDEADCAFE12345678912456789',
    //     logIndex: '53',
    //     blockNumber: '6000000',
    //     blockTimestamp: '12341234',
    //   },
    //   eventName: 'Transfer',
    // }
  })
})
}catch(error){
    console.log("watchEvent error"+error);
      cb({ code: 500, message: "wacthEventError: " + err.message });
      return;
}


  }



};

module.exports = watchEventHandler;