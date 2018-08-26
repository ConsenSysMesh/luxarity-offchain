

class createProjectS3Handler{

  constructor(databaseMgr, bucketMgr){
    this.databaseMgr = databaseMgr;
    this.bucketMgr = bucketMgr;
  };

 async handle(event, context, cb) {

  console.log("inside createProjectS3Handler.handle");

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

    if (!body.submissionDate) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
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

    if (!body.images || !body.images.length) {
      cb({ code: 400, message: "report parameter missing - images" });
      return;
    }



    try{

      console.log("inside try");

       //upload all images first, replace image data array in project with image URLs array
       //update ProjectId or return projectId first
      const images = await Promise.all(body.images.map(i => this.bucketMgr.writeImage(body.projectId, i)));
      body.images = images;

      console.log("after image processing");

      // now, save the project record itself
      const records = await this.databaseMgr.createProject(body);

      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("createProjectS3Handler error"+error);
      cb({ code: 500, message: "createProjectS3Handler: " + error.message });
      return;
    }

  }



};

module.exports = createProjectS3Handler;
