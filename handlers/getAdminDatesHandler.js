

class getAdminDatesHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside getAdminDatesHandler.handle");

  
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.getAdminDates();
      console.log("after records await");
      if(!records) {
        throw new Error('userId not found')
      }
      else {
        cb(null, records);
        return;
      }

    }catch(error){
      console.log("getAdminDatesHandler error"+error);
      cb({ code: 500, message: "getAdminDatesHandler: " + error.message });
      return;
    }

  }



};

module.exports = getAdminDatesHandler;