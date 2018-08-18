const Ethjs = require('ethjs')
const EthEvents = require('eth-events')
const Token = require('../build/contracts/Registry.json')
const sleep = require ('../util/sleep');

//ImpCoin:           0xe828317ca817b557184b72e094c14f759b602d51
//PLCRVoting:        0x4a4853a3102869511c263e18b9666437d17132b3
//Parameterizer:     0x73d38b6ec362297acb8be6628a221b18f84ec35a
//Registry:          0x6dbd66c23f636c39380b2ff40ac59569d6a6d63e
//just sent you 1000 IC to 0xbb011cdbfc28404baaa2d40a5ace94e9fb5695bd 

class confirmTxHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside confirmTx.handle");

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

     if (!body.txStatus) {
      cb({ code: 400, message: "report parameter missing - txStatus" });
      return;
    }

    if (!body.listingHash) {
      cb({ code: 400, message: "report parameter missing - listingHash" });
      return;
    }

    if (!body.sleepMs) {
      cb({ code: 400, message: "report parameter missing - sleepMs" });
      return;
    }

    

if(body.txStatus === 'Success')
    {
    //watch events
      console.log("watching _Application Event");

      // setup ethjs
      const provider = new Ethjs.HttpProvider('https://rinkeby.infura.io');
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
        listingHash: body.listingHash
        //data: 'Test Project Event'
        //listingHash: '0xbd61837be06d94e1ae9192878e518908b30a9e66e0810d1e139231d4ae17ed37'
        //_to: '0xCAFEDEADBEEF12345678912456789',
        //_to: '0x6dbd66c23f636c39380b2ff40ac59569d6a6d63e'
      }

      var applicationEvent = false;
      // async
      try{
      console.log("sleeping: "+body.sleepMs+"ms");
      await sleep(body.sleepMs);
      console.log("finished sleeping");
      await ethEvents.getLogs(fromBlock, toBlock, eventNames, indexedFilterValues).then(logs => {
        logs.map(log => {
          console.log(log)
          console.log("logListingHash: "+log.logData.listingHash);
          if(log.logData.listingHash==body.listingHash){

              console.log("listinghashes equal"); 
              applicationEvent = true; 
              } 

          
        })

      })
      }catch(error){
          console.log("watch _Application Event error"+error);
            cb({ code: 500, message: "watch _Application Event error: " + err.message });
            return;
      }

      //console.log("listing hash same "+logListingHash=body.listingHash);
      console.log("applicationEvent: "+applicationEvent);
      if(applicationEvent===true){

          try{

              console.log("inside try for promoteEventConfirm");
              const records = await this.databaseMgr.promoteEventConfirm(body);
              console.log("after records await");
              cb(null, records);

            }catch(error){
              console.log("promoteEventConfirm error"+error);
              cb({ code: 500, message: "promoteEventConfirm: " + err.message });
              return;
            }

      }
      if(applicationEvent===false){
        console.log("applicationEvent: "+applicationEvent);
              cb({ code: 500, message: "Application Event Not Confirmed: " });
              return;
      }
      
    }
    if(body.txStatus === 'Failed'){

      try{

              console.log("inside try for revertProject");
              const records = await this.databaseMgr.revertPromoteProject(body);
              console.log("after records await");
              cb(null, records);

            }catch(error){
              console.log("revertProject error"+error);
              cb({ code: 500, message: "revertProject: " + err.message });
              return;
            }


    }

  }//end handler



};//end class

module.exports = confirmTxHandler;