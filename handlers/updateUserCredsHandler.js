

class userHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside userHandler.handle");

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

   

    if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - userId" });
      return;
    }

    if (!body.password) {
      cb({ code: 400, message: "report parameter missing - password" });
      return;
    }

  
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.updateUserCreds(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("userHandler error"+error);
      cb({ code: 500, message: "userHandler: " + err.message });
      return;
    }

  }



};

module.exports = userHandler;