

class createCommentHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside createCommentHandler.handle");

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
      cb({ code: 400, message: "report parameter missing - name" });
      return;
    }

     if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - email" });
      return;
    }

     if (!body.comment) {
      cb({ code: 400, message: "report parameter missing - password" });
      return;
    }

    body.submissionDate = body.submissionDate = new Date().toISOString();

  
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.createComment(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("createCommentHandler error"+error);
      cb({ code: 500, message: "createCommentHandler error: " + error.message });
      return;
    }

  }



};

module.exports = createCommentHandler;