const sleep = require ('../util/sleep');

class runSleepHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside runSleepHandler.handle");

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

   

    if (!body.sleepMs) {
      cb({ code: 400, message: "report parameter missing - sleepMs" });
      return;
    }

    if(body.sleepMs > 28500){
      cb({ code: 400, message: "sleepMs for api gateway cannot be greater than 28500ms" });
      return;
    }

  
    console.log("sleeping: "+body.sleepMs+"ms");
    await sleep(body.sleepMs);
    console.log("finished sleeping");
    cb({ code: 200, message: "slept for "+body.sleepMs+"ms" });
      return;

  }



};

module.exports = runSleepHandler;