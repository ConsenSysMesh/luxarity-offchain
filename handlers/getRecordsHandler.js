

class getRecordsHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside getRecordsHandler.handle");
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.getRecords();
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("getrecordshandler error"+error);
      cb({ code: 500, message: "Sign Raw Tx Error: " + err.message });
      return;
    }

  }



};

module.exports = getRecordsHandler;