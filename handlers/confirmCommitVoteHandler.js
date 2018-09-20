
class confirmCommitVoteHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside confirmCommitVoteHandler.handle");

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

    if (!body.voterPublicKey) {
      cb({ code: 400, message: "report parameter missing - voterPublicKey" });
      return;
    }

  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.confirmCommitVote(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("confirmCommitVoteHandler error"+error);
      cb({ code: 500, message: "confirmCommitVoteHandler error: " + error.message });
      return;
    }


  }



};

module.exports = confirmCommitVoteHandler;