

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

    if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - userId" });
      return;
    }

     if (!body.userType) {
      cb({ code: 400, message: "report parameter missing - userType" });
      return;
    }

    if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }

    if (!body.vote) {
      cb({ code: 400, message: "report parameter missing - vote" });
      return;
    }

    if (!body.submissionDate) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

    
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.challenge(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("challengeHandler error"+error);
      cb({ code: 500, message: "challengeHandler: " + err.message });
      return;
    }

  }



};

module.exports = challengeHandler;