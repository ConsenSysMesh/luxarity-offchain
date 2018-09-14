

class getMaxChallengeIdHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside getMaxChallengeIdHandler.handle");

 try{

      console.log("inside try");
      const records = await this.databaseMgr.getMaxChallengeId();
      console.log("after records await");
      cb(null, records);
      return;

    }catch(error){
      console.log("getMaxChallengeIdHandler.getMaxChallengeId DB  error"+error);
      cb({ code: 500, message: "getMaxChallengeIdHandler.getMaxChallengeId DB error: " + error.message });
      return;
    }
  

  }



};

module.exports = getMaxChallengeIdHandler;