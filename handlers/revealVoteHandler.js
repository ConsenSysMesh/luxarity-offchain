
class revealVoteHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside revealVoteHandler.handle");

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
    if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - userId" });
      return;
    }

     if (!body.pollId) {
      cb({ code: 400, message: "report parameter missing - pollId" });
      return;
    }

    if (!body.voteOption) {
      cb({ code: 400, message: "report parameter missing - voteOption" });
      return;
    }
    
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.revealVote(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("revealVoteHandler error"+error);
      cb({ code: 107, message: "revealVoteHandler error: " + error.message });
      return;
    }


  }



};

module.exports = revealVoteHandler;