
class commitVoteHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside commitVoteHandler.handle");

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

   
    //
     if (!body.pollId) {
      cb({ code: 400, message: "report parameter missing - pollId" });
      return;
    }

    //voteOption is always 1 FOR the applicant, 0 AGAINST the applicant
    if (!body.secretHash) {
      cb({ code: 400, message: "report parameter missing - secretHash" });
      return;
    }

     if (!body.salt) {
      cb({ code: 400, message: "report parameter missing - voterPublicKey" });
      return;
    }

    if (!body.voteOption) {
      cb({ code: 400, message: "report parameter missing - voteOption" });
      return;
    }

    if (body.voteOption != 1 && body.voteOption != 0) {
      cb({ code: 400, message: "report parameter voteOption value must be 1 or 0" });
      return;
    }


    if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }

    if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - userId" });
      return;
    }

    if (!body.voterPublicKey) {
      cb({ code: 400, message: "report parameter missing - voterPublicKey" });
      return;
    }

  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.commitVote(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("commitVoteHandler db error"+error);
      cb({ code: 107, message: "commitVoteHandler db error: " + error.message });
      return;
    }


  }



};

module.exports = commitVoteHandler;