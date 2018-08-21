

class projectsUserHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside projectUserHandler.handle");

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
      cb({ code: 400, message: "report parameter missing" });
      return;
    }
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.getProjectsUser(body);
      console.log("after records await: "+records);
      if(!records) {
        console.log("in !records")
        throw new Error('project for userId not found')
      }
      else if(records){
        console.log("in else if")
        cb(null, records);
        return;
      }

    }catch(error){
      console.log("projectUserHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + error.message });
      return;
    }

  }



};

module.exports = projectsUserHandler;