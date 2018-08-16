

class promoteProjectHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside promoteProjectHandler.handle");

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

    // applied --> promoted
    //set status = 'PROMOTED'
    //where projectId = ''
    //record_status = not_confirmed

     if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }

    if (!body.listingHash) {
      cb({ code: 400, message: "report parameter missing - listingHash" });
      return;
    }

     if (!body.promoterPublicKey) {
      cb({ code: 400, message: "report parameter missing - promoterPublicKey" });
      return;
    }
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.promoteProject(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("promoteProjectHandler error"+error);
      cb({ code: 500, message: "promoteProjectHandler: " + err.message });
      return;
    }

  }



};

module.exports = promoteProjectHandler;