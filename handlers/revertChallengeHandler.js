
class revertChallengeHandler{

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

    body.submissionDate = new Date().toISOString().replace(/T.+/,'');


    try{

      console.log("inside project Challenge try");
      const records = await this.databaseMgr.revertChallenge(body);
      console.log("after records await: "+records);
      if(!records){throw new Error('projectId not found')}
      //cb(null, records);

    }catch(error){
      console.log("revertChallenge db error"+error);
      cb({ code: 500, message: "revertChallenge db  error: " + error.message });
      return;
    }
    
  
    try{

      console.log("inside challenge try");
      const records = await this.databaseMgr.revertProjectChallenge(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("revertProjectChallengeerror"+error);
      cb({ code: 500, message: "revertProjectChallenge: " + error.message });
      return;
    }



  }



};

module.exports = revertChallengeHandler;