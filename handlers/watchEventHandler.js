const Ethjs = require('ethjs')
    const EthEvents = require('eth-events')
    const Token = require('../testContracts/EIP20.json')

    // setup ethjs
    const provider = new Ethjs.HttpProvider('https://rinkeby.infura.io')
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
    }

class watchEventHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside watchEventHandler.handle");

    let body;

    if (event && !event.body) {
      body = event;
    } else if (event && event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        cb({ code: 400, message: "no json body" });
        return;
      }
    } else {
      cb({ code: 400, message: "no json body" });
      return;
    }

    // applied --> promoted
    //set status = 'PROMOTED'
    //where projectId = ''
    //record_status = not_confirmed

     if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.promoteProject(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("watchEventHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + err.message });
      return;
    }

    //watch event



  }

  async watchEvents(event, context, cb) {

    console.log('in watchEvents');
    

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
    })}catch(err){console.log("getlogs: "err)}

  }



};

module.exports = watchEventHandler;