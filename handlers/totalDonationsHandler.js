

class totalDonationsHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside totalDonationsHandler.handle");
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.totalDonations();
      console.log("after records await");
      cb(null, records);

    }catch(error){
      console.log("totalDonationsHandler error"+error);
      cb({ code: 500, message: "totalDonationsHandler error: " + error.message });
      return;
    }

  }



};

module.exports = totalDonationsHandler;