const Ethjs = require('ethjs')
const EthEvents = require('eth-events')
const Token = require('../testContracts/EIP20.json')

class watchEventHandler{

  constructor(databaseMgr){
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
  address: '0xe828317ca817b557184b72e094c14f759b602d51',
}

// init eth-events
const ethEvents = new EthEvents(ethjs, contract)

// block range
const fromBlock = '0'
const toBlock = 'latest'

// event name(s)
const eventNames = ['Transfer']

// indexed event emission arg values (un-hashed filter topics)
const indexedFilterValues = {
  //_to: '0xCAFEDEADBEEF12345678912456789',
  _to: '0x6dbd66c23f636c39380b2ff40ac59569d6a6d63e'
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
      cb({ code: 500, message: "createUserHandler: " + err.message });
      return;
}


  }



};

module.exports = watchEventHandler;