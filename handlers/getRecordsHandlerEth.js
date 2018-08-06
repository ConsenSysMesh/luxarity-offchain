

class getRecordsHandlerEth{

  constructor(databaseMgr, ethereumMgr){
    this.databaseMgr = databaseMgr;
    this.ethereumMgr = ethereumMgr;
  };

 async handle(event, context, cb) {

  console.log("inside getRecordsHandlerEth.handle");

    let hash;
    try{
      hash = await this.ethereumMgr.makeTx();
      console.log("hash: "+hash);
    }catch(error){
      console.log("getRecordsHandlerEth error"+error);
      cb({ code: 500, message: "getTestRecrodsError.ethMgr: " + err.message });
      return;
  }
  
    try{

      console.log("inside getRecordsHandlerEth.db try");
      const records = await this.databaseMgr.getTestRecords();
      console.log("after db records await");
      cb(null, records);

    }catch(error){
      console.log("getRecordsHandlerEth error"+error);
      cb({ code: 500, message: "getTestRecrodsError.db: " + err.message });
      return;
    }

  }



};

module.exports = getRecordsHandlerEth;