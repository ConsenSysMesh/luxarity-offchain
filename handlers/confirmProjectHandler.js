

class confirmProjectHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside confirmProjectHandler.handle");

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
    //insert listingHash, insert promoter_publickey, set status = 'PROMOTED', set record_status = 'confirmed'
    //where projectId = ''

    //registry.apply()
    //Event _application ()

    if (!body.listingHash) {
      cb({ code: 400, message: "report parameter missing - listingHash" });
      return;
    }

    if (!body.promoterPublickey) {
      cb({ code: 400, message: "report parameter missing - promoterPublickey" });
      return;
    }

    if (!body.projectId) {
      cb({ code: 400, message: "report parameter missing - projectId" });
      return;
    }


  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.confirmProject(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("confirmProjectHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + err.message });
      return;
    }

  }



};

module.exports = confirmProjectHandler;