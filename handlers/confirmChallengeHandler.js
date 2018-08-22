

class confirmChallengeHandler{

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

   
    //note body.challengeId is autoincremented in postgres
     if (!body.listingHash) {
      cb({ code: 400, message: "report parameter missing - listingHash" });
      return;
    }

    if (!body.challengeId) {
      cb({ code: 400, message: "report parameter missing - challengeId" });
      return;
    }

    if (!body.data) {
      cb({ code: 400, message: "report parameter missing - data" });
      return;
    }

      if (!body.commitEndDate) {
      cb({ code: 400, message: "report parameter missing - commitEndDate" });
      return;
    }

    if (!body.revealEndDate) {
      cb({ code: 400, message: "report parameter missing - revealEndDate" });
      return;
    }

    if (!body.challenger) {
      cb({ code: 400, message: "report parameter missing - challenger" });
      return;
    }

    
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.confirmChallenge(body);
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("confirmChallenge error"+error);
      cb({ code: 500, message: "confirmChallenge: " + error.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.confirmProjectChallenge(body);
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("confirmProjectChallenge error"+error);
      cb({ code: 500, message: "confirmProjectChallenge: " + error.message });
      return;
    }

  }



};

module.exports = confirmChallengeHandler;