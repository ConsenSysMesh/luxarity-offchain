

class testHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside testHandler.handle");

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

   
    //body.listingHash, body.promoterPublickey, body.projectId
    if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }

    if (!body.userId) {
      cb({ code: 400, message: "report parameter missing - userId" });
      return;
    }

    if (!body.submissionDate) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

    if (!body.listingHash) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

    if (!body.challengerPublicKey) {
      cb({ code: 400, message: "report parameter missing - submissionDate" });
      return;
    }

  
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.challenge(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("testHandler error"+error);
      cb({ code: 500, message: "testHandler: " + err.message });
      return;
    }

  }



};

module.exports = testHandler;