

class createUserHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside createUserHandler.handle");

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

    if (!body.userType) {
      cb({ code: 400, message: "report parameter missing - userType" });
      return;
    }

     if (!body.userName) {
      cb({ code: 400, message: "report parameter missing - userName" });
      return;
    }

    if (!body.userEmail) {
      cb({ code: 400, message: "report parameter missing - userEmail" });
      return;
    }

    if (!body.userPassword) {
      cb({ code: 400, message: "report parameter missing - userPassword" });
      return;
    }

    


  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.createUser(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("createUserHandler error"+error);
      cb({ code: 500, message: "createUserHandler: " + err.message });
      return;
    }

  }



};

module.exports = createUserHandler;