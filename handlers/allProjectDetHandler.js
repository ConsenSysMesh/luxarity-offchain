

class allProjectDetHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside allProjectDetHandler.handle");
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.getAllProjectDets();
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("allProjectDetHandler error"+error);
      cb({ code: 500, message: "getTestRecrodsError: " + err.message });
      return;
    }

  }



};

module.exports = allProjectDetHandler;