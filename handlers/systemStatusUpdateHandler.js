

class systemStatusUpdateHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside createUserHandler.handle");

  /*let body = event.Records[0].body;
  try {
        body = JSON.parse(body);
      } catch (e) {
        cb({ code: 500, message: "no json body" });
        return;
      }*/
  
    /*try{

      console.log("inside try");
      const records = await this.databaseMgr.updateProjectStatus(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("systemStatusUpdate error"+error);
      cb({ code: 500, message: "systemStatusUpdate error: " + error.message });
      return;
    }*/

    //add updateProjectStatusINCHALLENEGEPERIOD

    try{

      console.log("updateProjectStatusInChallengePeriod");
      const records_commit = await this.databaseMgr.updateProjectStatusInChallengePeriod();
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("systemStatusUpdate updateProjectStatusCommit error"+error);
      cb({ code: 500, message: "systemStatusUpdate updateProjectStatusCommit error: " + error.message });
      return;
  }

  try{

      console.log("updateProjectStatusNotChallenged");
      const records_commit = await this.databaseMgr.updateProjectStatusNotChallenged();
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("systemStatusUpdate updateProjectStatusCommit error"+error);
      cb({ code: 500, message: "systemStatusUpdate updateProjectStatusCommit error: " + error.message });
      return;
  }

    try{

      console.log("updateProjectStatusCommit");
      const records_commit = await this.databaseMgr.updateProjectStatusCommit();
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("systemStatusUpdate updateProjectStatusCommit error"+error);
      cb({ code: 500, message: "systemStatusUpdate updateProjectStatusCommit error: " + error.message });
      return;
  }

  try{

      console.log("updateProjectStatusReveal");
      const records_reveal = await this.databaseMgr.updateProjectStatusReveal();
      console.log("after records await");
      //cb(null, records);

    }catch(error){
      console.log("systemStatusUpdate updateProjectStatusReveal error"+error);
      cb({ code: 500, message: "systemStatusUpdate updateProjectStatusReveal error: " + error.message });
      return;
  }

  try{

      console.log("updateProjectStatusConclusion");
      const records_conclusion = await this.databaseMgr.updateProjectStatusConclusion();
      console.log("after records await");
      cb(null, {code: 200, message: "successful update of commit reveal and conclusion statuses"});
      return;

    }catch(error){
      console.log("systemStatusUpdate updateProjectStatusConclusion error"+error);
      cb({ code: 500, message: "systemStatusUpdate updateProjectStatusConclusion error: " + error.message });
      return;
  }



};
}

module.exports = systemStatusUpdateHandler;