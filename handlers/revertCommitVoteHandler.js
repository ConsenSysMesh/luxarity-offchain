
class revertCommitVoteHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside revertCommitVoteHandler.handle");

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

    if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - userId" });
      return;
    }

    if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }

  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.revertCommitVote(body);
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("revertCommitVoteHandler db error"+error);
      cb({ code: 500, message: "revertCommitVoteHandler db error: " + error.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.projectRevertCommitVote(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("revertCommitVoteHandler db error"+error);
      cb({ code: 500, message: "revertCommitVoteHandler db error: " + error.message });
      return;
    }


  }



};


module.exports = revertCommitVoteHandler;