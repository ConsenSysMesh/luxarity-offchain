const Ethjs = require('ethjs')
const EthEvents = require('eth-events')
const Token = require('../build/contracts/Registry.json')

//ImpCoin:           0xe828317ca817b557184b72e094c14f759b602d51
//PLCRVoting:        0x4a4853a3102869511c263e18b9666437d17132b3
//Parameterizer:     0x73d38b6ec362297acb8be6628a221b18f84ec35a
//Registry:          0x6dbd66c23f636c39380b2ff40ac59569d6a6d63e
//just sent you 1000 IC to 0xbb011cdbfc28404baaa2d40a5ace94e9fb5695bd 

class challengeHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside challengeHandler.handle");

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

   
    //note body.challengeId is autoincremented in postgres
     if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }

    if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - userId" });
      return;
    }

    if (!body.submissionDate) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

    if (!body.listingHash) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

    if (!body.challengerPublicKey) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

    
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.challenge(body);
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("challenge db error"+error);
      cb({ code: 500, message: "challenge db error: " + err.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.projectChallenge(body);
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("projectChallenge db error"+error);
      cb({ code: 500, message: "projectChallenge db error: " + err.message });
      return;
    }


    //watch event
    console.log("inside createUserHandler.handle");

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
      const eventNames = ['_Challenge']

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
          console.log("watchEvent error"+error);
            cb({ code: 500, message: "wacthEventError: " + err.message });
            return;
      }

      //if challenge event confirm challenge in db
      console.log("applicationEvent: "+applicationEvent);
      if(applicationEvent===true){

          try{

              console.log("inside try");
              const records = await this.databaseMgr.challengeEventConfirm(body);
              console.log("after records await");
              cb(null, records);

            }catch(error){
              console.log("challengeEventConfirm db error"+error);
              cb({ code: 500, message: "challengeEventConfirm db error: " + err.message });
              return;
            }

            try{

              console.log("inside try");
              const records = await this.databaseMgr.challengeProjectEventConfirm(body);
              console.log("after records await");
              cb(null, records);

            }catch(error){
              console.log("challengeProjectEventConfirm db error"+error);
              cb({ code: 500, message: "challengeProjectEventConfirm db error: " + err.message });
              return;
            }

      }
      if(applicationEvent===false){
        console.log("applicationEvent: "+applicationEvent);
              cb({ code: 500, message: "Challenge Event Not Confirmed: " });
              return;
      }


  }



};

module.exports = challengeHandler;