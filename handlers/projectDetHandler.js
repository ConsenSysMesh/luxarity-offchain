

class projectDetHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside projectDetHandler.handle");

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
      const records = await this.databaseMgr.getProjectDets(body.projectId);
      if(!records) {
        throw new Error('project for projectId not found')
      }
      else if(records){
        cb(null, records);
        return;
      }

    }catch(error){
      console.log("projectDetHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + error.message });
      return;
    }

  }



};

module.exports = projectDetHandler;