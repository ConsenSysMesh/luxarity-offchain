

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
      cb({ code: 400, message: "report parameter missing - url" });
      return;
    }

    if (!body.categories) {
      cb({ code: 400, message: "report parameter missing - categories" });
      return;
    }

    if (!body.startDate) {
      cb({ code: 400, message: "report parameter missing - startDate" });
      return;
    }

    if (!body.endDate) {
      cb({ code: 400, message: "report parameter missing - endDate" });
      return;
    }

    if (!body.problemSummary) {
      cb({ code: 400, message: "report parameter missing - problem_summary" });
      return;
    }

    if (!body.problemEvidence) {
      cb({ code: 400, message: "report parameter missing - problem_evidence" });
      return;
    }


    if (!body.solution) {
      cb({ code: 400, message: "report parameter missing - solution" });
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
     if (!body.funding) {
      cb({ code: 400, message: "report parameter missing - funding" });
      return;
    }

     if (!body.team) {
      cb({ code: 400, message: "report parameter missing - team" });
      return;
    }
     if (!body.ready) {
      cb({ code: 400, message: "boolean report parameter missing - ready" });
      return;
    }
     if (!body.workplan) {
      cb({ code: 400, message: "report parameter missing - workplan" });
      return;
    }

    if (!body.risks) {
      cb({ code: 400, message: "report parameter missing - risks" });
      return;
    }

    if (!body.outcomes) {
      cb({ code: 400, message: "report parameter missing - outcomes" });
      return;
    }

    if (!body.outcome1) {
      cb({ code: 400, message: "report parameter missing - outcome1" });
      return;
    }
    if (!body.outcome2) {
      cb({ code: 400, message: "report parameter missing - outcome2" });
      return;
    }
    if (!body.outcome3) {
      cb({ code: 400, message: "report parameter missing - outcome3" });
      return;
    }
    
    if (!body.longTermImpact) {
      cb({ code: 400, message: "report parameter missing - longTermImpact" });
      return;
    }

    if (!body.learnings) {
      cb({ code: 400, message: "report parameter missing - learnings" });
      return;
    }

    if (!body.benefits) {
      cb({ code: 400, message: "report parameter missing - benefits" });
      return;
    }

    if (!body.budgetUrl) {
      cb({ code: 400, message: "report parameter missing - budgetUrl" });
      return;
    }
    if (!body.financialSustainability) {
      cb({ code: 400, message: "report parameter missing - financialSustainability" });
      return;
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
