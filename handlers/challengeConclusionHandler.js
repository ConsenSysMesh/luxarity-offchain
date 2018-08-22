

class challengeConclusionHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside confirmChallengeHandler.handle");

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

   
     if (!body.challengeOutcome) {
      cb({ code: 400, message: "report parameter missing - challengeOutcome" });
      return;
    }

     if (!body.listingHash) {
      cb({ code: 400, message: "report parameter missing - listingHash" });
      return;
    }

    if (!body.challengeId) {
      cb({ code: 400, message: "report parameter missing - challengeId" });
      return;
    }

    if (!body.rewardPool) {
      cb({ code: 400, message: "report parameter missing - rewardPool" });
      return;
    }

      if (!body.totalTokens) {
      cb({ code: 400, message: "report parameter missing - totalTokens" });
      return;
    }

    


    

    try{

      if(body.challengeOutcome=='Success'){
      body.status='ACCEPTED',
      body.rejection_date='',
      body.record_status=''
      }else if(body.challengeOutcome=='Failed'){
        body.status='REJECTED',
        body.rejection_date='fixThis',
        body.record_status='final'
      }else{
        throw new Error('challengeOutcome must be Success or Failed')
      }

      console.log("inside try");
      const records = await this.databaseMgr.challengeProjectConclusion(body);
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("confirmProjectChallenge error"+error);
      cb({ code: 500, message: "confirmProjectChallenge: " + error.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.challengeConlusion(body);
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("confirmChallenge error"+error);
      cb({ code: 500, message: "confirmChallenge: " + error.message });
      return;
    }

  }



};

module.exports = confirmChallengeHandler;