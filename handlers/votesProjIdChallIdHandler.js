

class votesProjIdChallIdHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside votesProjIdChallIdHandler.handle");

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

    if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }

    if (!body.challengeId) {
      cb({ code: 400, message: "report parameter missing - challengeId" });
      return;
    }



    if (body.userId) {
      console.log("userId included, calling getVotesUser")
    
    try{

      console.log("inside try");
      const records = await this.databaseMgr.getVotesUser(body);
      if(!records) {
        throw new Error('votes for challengeId and projectId not found')
      }
      else if(records){
        cb(null, records);
        return;
      }

    }catch(error){
      console.log("votesProjIdChallIdHandler error"+error);
      cb({ code: 500, message: "votesProjIdChallIdHandler: " + error.message });
      return;
    }

    }else{
      console.log("no userId, returning all votes for challengeId and projectId")
      try{
        console.log("inside try");
        const records2 = await this.databaseMgr.getVotes(body);
        if(!records2) {
          throw new Error('votes for challengeId, projectId, and userId not found')
        }else if(records2){
          cb(null, records2);
          return;
        }
      }catch(error){
        console.log("votesProjIdChallIdHandler error"+error);
        cb({ code: 500, message: "votesProjIdChallIdHandler: " + error.message });
        return;
        }

    }

  }



};

module.exports = votesProjIdChallIdHandler;