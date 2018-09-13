

class sqsHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside sqsHandler.handle");

  let body;


    if(event['Records'][0].body){

      body = JSON.parse(event['Records'][0].body)
    }
    else {
      cb({ code: 400, message: "no event.body" });
      return;
    }

    if(!body.sport){
      console.log("no body.sport")
       cb({ code: 400, message: "missing body.sport parameter" });
      return;
    }

    cb(null, "success sqs")
  

  }



};

module.exports = sqsHandler;