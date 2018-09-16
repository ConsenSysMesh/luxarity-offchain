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
  
    if (!body.listingHash) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

    if (!body.challengerPublicKey) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

    body.submissionDate = new Date().toISOString().replace(/T.+/,'');


    try{

      console.log("inside project Challenge try");
      const records = await this.databaseMgr.projectChallenge(body);
      console.log("after records await: "+records);
      if(!records){throw new Error('projectId not found')}
      //cb(null, records);

    }catch(error){
      console.log("projectChallenge db error"+error);
      cb({ code: 107, message: "projectChallenge db error: " + error.message });
      return;
    }
    
  
    try{

      console.log("inside challenge try");
      const records = await this.databaseMgr.challenge(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("challenge db error"+error);
      cb({ code: 107, message: "challenge db error: " + error.message });
      return;
    }



  }



};

module.exports = challengeHandler;