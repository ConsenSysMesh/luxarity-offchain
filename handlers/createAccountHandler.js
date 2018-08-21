

class createAccountHandler{

  constructor(databaseMgr, bucketMgr){
    this.databaseMgr = databaseMgr;
    this.bucketMgr = bucketMgr;
  };

 async handle(event, context, cb) {

  console.log("inside createAccountHandler.handle");

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


    //note: body.projectId automatically incremented in postgres



    if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - userId" });
      return;
    }

     if (!body.projectCategory) {
      cb({ code: 400, message: "report parameter missing - projectCategory" });
      return;
    }

    if (!body.projectProblem) {
      cb({ code: 400, message: "report parameter missing - projectProblem" });
      return;
    }

    if (!body.projectApproach) {
      cb({ code: 400, message: "report parameter missing - projectApproach" });
      return;
    }

    if (!body.projectStage) {
      cb({ code: 400, message: "report parameter missing - projectStage" });
      return;
    }

     if (!body.projectImpact) {
      cb({ code: 400, message: "report parameter missing - projectImpact" });
      return;
    }

    if (!body.fundingGoal) {
      cb({ code: 400, message: "report parameter missing - fundingGoal" });
      return;
    }

    if (!body.teamInfo) {
      cb({ code: 400, message: "report parameter missing - teamInfo" });
      return;
    }



    try{

      console.log("inside try");
      
      // now, save the project record itself
      const records = await this.databaseMgr.createAccount(body);

      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("createAccountHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + error.message });
      return;
    }

  }



};

module.exports = createAccountHandler;
