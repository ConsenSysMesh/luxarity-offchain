

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

    if (!body.url) {
      body.url = '';
    }

    if (!body.categories) {
      body.categories = '';
    }

    if (!body.startDate) {
       body.startDate = null;
    }

    if (!body.endDate) {
       body.endDate = null;
    }

    if (!body.problemSummary) {
      body.problemSummary = '';
    }

    if (!body.problemEvidence) {
      body.problemEvidence = '';
    }


    if (!body.solution) {
      body.solution = '';
    }

     if (!body.stage) {
      body.stage = '';
    }
     if (!body.impact) {
      body.impact = '';
    }
     if (!body.funding) {
      body.funding = '';
    }

     if (!body.team) {
      body.team = '';
    }
     if (!body.ready) {
      body.ready = null;
    }
     if (!body.workplan) {
      body.workplan = '';
    }

    if (!body.risks) {
     body.risks = '';
    }

    if (!body.outcomes) {
      body.outcomes = '';
    }

    if (!body.outcome1) {
      body.outcome1 = '';
    }
    if (!body.outcome2) {
      body.outcome2 = '';
    }
    if (!body.outcome3) {
      body.outcome3 = '';
    }
    
    if (!body.longTermImpact) {
      body.longTermImpact = '';
    }

    if (!body.learnings) {
     body.learnings = '';
    }

    if (!body.benefits) {
      body.benefits = '';
    }

    if (!body.budgetUrl) {
      body.budgetUrl = '';
    }
    if (!body.financialSustainability) {
      body.financialSustainability = '';
    }
    if (!body.imageUrl) {
      cb({ code: 400, message: "report parameter missing - imageUrl" });
      return;
    }
   
    if (!body.submitterId) {
      cb({ code: 400, message: "report parameter missing - submitterId" });
      return;
    }


    //add videoUrl logic

    body.submissionDate = new Date().toISOString().replace(/T.+/,'');
 
    //body.categories = "array" + body.categories;



   if(!body.videoUrl){
    console.log("inside no video")
    try{

      console.log("inside try");

      const records = await this.databaseMgr.createProject(body);

      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("createProjectHandler error"+error);
      cb({ code: 500, message: "createProject DB error: " + error.message });
      return;
    }
  }else{
    try{

      console.log("inside try");

      const records = await this.databaseMgr.createProjectVideo(body);

      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("createProjectHandler error"+error);
      cb({ code: 500, message: "createProjectVideo DB error: " + error.message });
      return;
    }

  }

  }



};

module.exports = createProjectHandler;
