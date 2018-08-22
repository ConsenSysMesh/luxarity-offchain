

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
        console.log("challenge success")
      body.status='ACCEPTED';
      body.record_status='';
      const records = await this.databaseMgr.challengeProjectConclusionSuccess(body);

      }else if(body.challengeOutcome=='Failed'){
        body.status = 'REJECTED';
        body.rejection_date = new Date().toISOString().replace(/T.+/,'');
        body.record_status = 'final';
        const records = await this.databaseMgr.challengeProjectConclusionFailed(body);
      }else{
        throw new Error('challengeOutcome must be Success or Failed')
      }

    }catch(error){
      console.log("challengeProjectConclusion error"+error);
      cb({ code: 500, message: "challengeProjectConclusion: " + error.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.challengeConclusion(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("challengeConclusion error"+error);
      cb({ code: 500, message: "challengeConclusion: " + error.message });
      return;
    }

  }



};

module.exports = challengeConclusionHandler;