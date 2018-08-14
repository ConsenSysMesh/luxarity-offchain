

class revertPromoteProjectHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside revertPromoteProjectHandler.handle");

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

    // when registy.apply() fails

     if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.revertPromoteProject(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("revertPromoteProjectHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + err.message });
      return;
    }

  }



};

module.exports = revertPromoteProjectHandler;