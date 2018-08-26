

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


    //note: body.projectId automatically incremented in postgres

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

    if (!body.submitterId) {
      cb({ code: 400, message: "report parameter missing - submitterId" });
      return;
    }


    if (!body.mediaTitle) {
      cb({ code: 400, message: "report parameter missing - mediaTitle" });
      return;
    }

    if (!body.images || !body.images.length) {
      cb({ code: 400, message: "report parameter missing - images" });
      return;
    }

     if (!body.category) {
      cb({ code: 400, message: "report parameter missing - category" });
      return;
    }
     if (!body.problem) {
      cb({ code: 400, message: "report parameter missing - problem" });
      return;
    }
     if (!body.stage) {
      cb({ code: 400, message: "report parameter missing - stage" });
      return;
    }
     if (!body.impact) {
      cb({ code: 400, message: "report parameter missing - impact" });
      return;
    }
     if (!body.fundingGoal) {
      cb({ code: 400, message: "report parameter missing - fundingGoal" });
      return;
    }
     if (!body.teamInfo) {
      cb({ code: 400, message: "report parameter missing - teamInfo" });
      return;
    }

    body.submissionDate = new Date().toISOString().replace(/T.+/,'');





    try{

      console.log("inside try");

      // upload all images first, replace image data array in project with image URLs array
      //const images = await Promise.all(body.images.map(i => this.bucketMgr.writeImage(body.projectId, i)));
      //body.images = images;

      console.log("after image processing");

      // now, save the project record itself
      const records = await this.databaseMgr.createProject(body);

      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("createProjectHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + error.message });
      return;
    }

  }



};

module.exports = createProjectHandler;
