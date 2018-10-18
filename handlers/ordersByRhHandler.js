

class ordersByRhHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside ordersByRhHandler.handle");

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

   

    if (!body.redemptionHash) {
      cb({ code: 400, message: "report parameter missing - redemptionHash" });
      return;
    }
  
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.ordersByRedemptionhash(body);
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("ordersByRhHandler error"+error);
      cb({ code: 500, message: "ordersByRhHandler error: " + error.message });
      return;
    }

  }



};

module.exports = ordersByRhHandler;