

class totalSalesHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside totalSalesHandler.handle");
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.totalSold();
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("totalSalesHandler error"+error);
      cb({ code: 500, message: "totalSalesHandler error: " + error.message });
      return;
    }

  }


};

module.exports = totalSalesHandler;