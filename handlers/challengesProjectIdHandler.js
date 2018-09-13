

class challengesProjectIdHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside challengesProjectIdHandler.handle");

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
      cb({ code: 400, message: "report parameter missing" });
      return;
    }
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.getChallenge(body);
      if(!records) {
        throw new Error('challenges for projectId not found')
      }
      else if(records){
        cb(null, records);
        return;
      }

    }catch(error){
      console.log("challengesProjectIdHandler error"+error);
      cb({ code: 500, message: "challengesProjectIdHandler: " + error.message });
      return;
    }

  }



};

module.exports = challengesProjectIdHandler;