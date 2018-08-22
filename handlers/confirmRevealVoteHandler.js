
class confirmRevealVoteHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside confirmRevealVoteHandler.handle");

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
    if (!body.voter) {
      cb({ code: 400, message: "report parameter missing - voter" });
      return;
    }

     if (!body.pollId) {
      cb({ code: 400, message: "report parameter missing - pollId" });
      return;
    }


    
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.confirmRevealVote(body);
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("confirmRevealVoteHandler error"+error);
      cb({ code: 500, message: "confirmRevealVoteHandler error: " + error.message });
      return;
    }


  }



};

module.exports = confirmRevealVoteHandler;