

class createProjectHandler{

  constructor(databaseMgr, bucketMgr){
    this.databaseMgr = databaseMgr;
    this.bucketMgr = bucketMgr;
  };

 async handle(event, context, cb) {

  console.log("inside createProjectHandler.handle");

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

    if (!body.title) {
      cb({ code: 400, message: "report parameter missing - title" });
      return;
    }

     if (!body.location) {
      cb({ code: 400, message: "report parameter missing - location" });
      return;
    }

    if (!body.descriptionShort) {
      cb({ code: 400, message: "report parameter missing - descriptionShort" });
      return;
    }

    if (!body.descriptionLong) {
      cb({ code: 400, message: "report parameter missing - descriptionLong" });
      return;
    }

    if (!body.teamNumber) {
      cb({ code: 400, message: "report parameter missing - teamNumber" });
      return;
    }

     if (!body.teamName) {
      cb({ code: 400, message: "report parameter missing - teamName" });
      return;
    }

    if (!body.submitterId) {
      cb({ code: 400, message: "report parameter missing - submitterId" });
      return;
    }

    if (!body.status) {
      cb({ code: 400, message: "report parameter missing - status" });
      return;
    }

    if (!body.tags) {
      cb({ code: 400, message: "report parameter missing - tags" });
      return;
    }

    if (!body.mediaTitle) {
      cb({ code: 400, message: "report parameter missing - mediaTitle" });
      return;
    }

    if (!body.images) {
      cb({ code: 400, message: "report parameter missing - images" });
      return;
    }


  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.createProject(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("createProjectHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + err.message });
      return;
    }

  }



};

module.exports = createProjectHandler;
