'use strict';
const AWS = require("aws-sdk");

const DatabaseMgr = require('./lib/DatabaseMgr');
const BucketMgr = require('./lib/BucketMgr');
//const GetRecordsHandler = require('./handlers/getRecordsHandler');
const AllProjectDetHandler = require('./handlers/allProjectDetHandler');
const ProjectDetHandler = require('./handlers/projectDetHandler');
const CreateProjectHandler = require('./handlers/createProjectHandler');
const CreateUserHandler = require('./handlers/createUserHandler');
const UserHandler = require('./handlers/userHandler');
//const RelayHandler = require('./handlers/relayHandler');
const PromoteProjectHandler = require('./handlers/promoteProjectHandler');
const CreateAccountHandler = require('./handlers/createAccountHandler');
const ConfirmProjectHandler = require('./handlers/confirmProjectHandler');
const RevertPromoteProjectHandler = require('./handlers/revertPromoteProjectHandler');
const ChallengeHandler = require('./handlers/challengeHandler');
const ConfirmChallengeHandler = require('./handlers/confirmChallengeHandler');
//const WatchEventHandler = require('./handlers/watchEventHandler');
//const IntegratePromoteWatchHandler = require('./handlers/integratePromoteWatchHandler');
const CommitVoteHandler = require('./handlers/commitVoteHandler');
//const TestHandler = require('./handlers/testHandler');
const ConfirmTxHandler = require('./handlers/confirmTxHandler');
//const RunSleepHandler = require('./handlers/runSleepHandler');
const ProjectsUserHandler = require('./handlers/projectsUserHandler');
const UpdateUserCredsHandler = require('./handlers/updateUserCredsHandler');
//const IntegrateChallengeWatchHandler = require('./handlers/integrateChallengeWatchHandler');
const ChallengeConclusionHandler = require('./handlers/challengeConclusionHandler');
const ConfirmCommitVoteHandler = require('./handlers/confirmCommitVoteHandler');
const RevealVoteHandler = require('./handlers/revealVoteHandler');
const ConfirmRevealVoteHandler = require('./handlers/confirmRevealVoteHandler');
const UserLoginHandler = require('./handlers/userLoginHandler');
const CreateProjectS3Handler = require('./handlers/createProjectS3Handler');
const RevertChallengeHandler = require('./handlers/revertChallengeHandler');
const RevertCommitVoteHandler = require('./handlers/revertCommitVoteHandler');


const databaseMgr = new DatabaseMgr();
const bucketMgr = new BucketMgr();
//const getRecordsHandler = new GetRecordsHandler(databaseMgr);
const allProjectDetHandler = new AllProjectDetHandler(databaseMgr);
const projectDetHandler = new ProjectDetHandler(databaseMgr);
const createProjectHandler = new CreateProjectHandler(databaseMgr, bucketMgr);
const createUserHandler = new CreateUserHandler(databaseMgr);
const userHandler = new UserHandler(databaseMgr);
const promoteProjectHandler = new PromoteProjectHandler(databaseMgr);
const createAccountHandler = new CreateAccountHandler(databaseMgr);
const confirmProjectHandler = new ConfirmProjectHandler(databaseMgr);
const revertPromoteProjectHandler = new RevertPromoteProjectHandler(databaseMgr);
const challengeHandler = new ChallengeHandler(databaseMgr);
const confirmChallengeHandler = new ConfirmChallengeHandler(databaseMgr);
//const watchEventHandler = new WatchEventHandler();
//const integratePromoteWatchHandler = new IntegratePromoteWatchHandler(databaseMgr);
const commitVoteHandler = new CommitVoteHandler(databaseMgr);
//const testHandler = new TestHandler(databaseMgr);
const confirmTxHandler = new ConfirmTxHandler(databaseMgr);
//const runSleepHandler = new RunSleepHandler();
const projectsUserHandler = new ProjectsUserHandler(databaseMgr);
const updateUserCredsHandler = new UpdateUserCredsHandler(databaseMgr);
//const integrateChallengeWatchHandler = new IntegrateChallengeWatchHandler(databaseMgr);
const challengeConclusionHandler = new ChallengeConclusionHandler(databaseMgr);
const confirmCommitVoteHandler = new ConfirmCommitVoteHandler(databaseMgr);
const revealVoteHandler = new RevealVoteHandler(databaseMgr);
const confirmRevealVoteHandler = new ConfirmRevealVoteHandler(databaseMgr);
const userLoginHandler = new UserLoginHandler(databaseMgr);
const createProjectS3Handler = new CreateProjectS3Handler(databaseMgr, bucketMgr);
const revertChallengeHandler = new RevertChallengeHandler(databaseMgr);
const revertCommitVoteHandler = new RevertCommitVoteHandler(databaseMgr);

//const SqsHandler = require('./handlers/sqsHandler');
//const sqsHandler = new SqsHandler(databaseMgr);

const GetLogsApplicationHandler = require('./handlers/getLogsApplicationHandler');
const getLogsApplicationHandler = new GetLogsApplicationHandler(databaseMgr);
const GetLogsChallengeHandler = require('./handlers/getLogsChallengeHandler');
const getLogsChallengeHandler = new GetLogsChallengeHandler(databaseMgr);

//notes:
// before tcr need:
// token.approve(regsistry), 
// token.approve(plcrVoting),
//voting.requestVotingRighs

//done
module.exports.testEndpoint = (event, context, callback) => {

  let response = {
              statusCode: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
              },
              body: JSON.stringify({
                status: "success"
              })
            };
   callback(null, response);
};

/*module.exports.receiver  = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  console.log('event: ',JSON.stringify(event));

  var body = event.Records[0].body;
  console.log("text: ",JSON.parse(body).text);

  callback(null, response);
};

module.exports.receiver2  = (event, context, callback) => {
var body1 = event.Records[0].body;
console.log('reciever 2 event: ',JSON.stringify(event));
if(!body1 || JSON.parse(body1).text != 'test'){
console.log("bad json input");
const badresponse = {
    statusCode: 500,
    body: JSON.stringify({
      message: 'bad json request',
      input: event,
    }),
  };
  callback(null, badresponse)

}else{
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  

  var body = event.Records[0].body;
  console.log("text: ",JSON.parse(body).text);

  callback(null, response);
}

};

module.exports.receiver3  = (event, context, callback) => {
var body1 = event.Records[0].body;
console.log('reciever 3 event: ',JSON.stringify(event));
if(!body1) {
console.log("no json input");
const badjson = {
    statusCode: 500,
    body: JSON.stringify({
      message: 'bad json request',
      input: event,
    }),
  };
  callback({ code: 500, message: "report parameter missing - no json" });
  return;
  //callback(null, badjson)

}

if(!JSON.parse(body1).listingHash){
console.log("no listingHash");
const nohash = {
    statusCode: 500,
    body: JSON.stringify({
      message: 'bad json request - no listingHash',
      input: event,
    }),
  };
  //callback(null, nohash)
  callback({ code: 500, message: "report parameter missing - listingHash" });
  return;
}

if(!JSON.parse(body1).userId){
console.log("no userId");
const nouser = {
    statusCode: 500,
    body: JSON.stringify({
      message: 'bad json request - no userId',
      input: event,
    }),
  };

  callback({ code: 500, message: "report parameter missing - userId" });
  return;
  //callback(null, nouser)
}


  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  

  //var body = event.Records[0].body;
  console.log("Success listingHash: ",JSON.parse(body1).listingHash);
  console.log("Success userId: ",JSON.parse(body1).userId);

  callback(null, response);

};*/



//module.exports.sqs = (event, context, callback) => {
  
  // console.log("event['records'][0].body: "+event['Records'][0].body);
   //let body = event['Records'][0].body;
   //console.log("json: "+JSON.parse(body).sport)
   // {"sport" : "hockey"}
   

   //preHandler(sqsHandler, event, context, callback);
//};

module.exports.getLogsApplication = (event, context, callback) => {
   preHandler(getLogsApplicationHandler, event, context, callback);
};

module.exports.getLogsChallenge = (event, context, callback) => {
   preHandler(getLogsChallengeHandler, event, context, callback);
};


//done
module.exports.allProjectDet = (event, context, callback) => {
   preHandler(allProjectDetHandler, event, context, callback);
};

//done
module.exports.projectDet = (event, context, callback) => {
   preHandler(projectDetHandler, event, context, callback);
};

module.exports.projectsUser = (event, context, callback) => {
   preHandler(projectsUserHandler, event, context, callback);
};

//done
module.exports.createProject = (event, context, callback) => {
   preHandler(createProjectHandler, event, context, callback);
};

module.exports.createProjectS3 = (event, context, callback) => {
   preHandler(createProjectS3Handler, event, context, callback);
};

//done
module.exports.createUser = (event, context, callback) => {
   preHandler(createUserHandler, event, context, callback);
};

module.exports.updateUserCreds = (event, context, callback) => {
   preHandler(updateUserCredsHandler, event, context, callback);
};

//done
module.exports.user = (event, context, callback) => {
   preHandler(userHandler, event, context, callback);
};

module.exports.userLogin = (event, context, callback) => {
   preHandler(userLoginHandler, event, context, callback);
};


//done
//module.exports.relay = (event, context, callback) => {
  // preHandlerSensui(relayHandler, event, context, callback);
//};

//done not needed
module.exports.promoteProject = (event, context, callback) => {
   preHandler(promoteProjectHandler, event, context, callback);
};

//done not needed
module.exports.confirmProject = (event, context, callback) => {
   preHandler(confirmProjectHandler, event, context, callback);
};

//done possibly not needed
module.exports.revertPromoteProject = (event, context, callback) => {
   preHandler(revertPromoteProjectHandler, event, context, callback);
};

//done
module.exports.createAccount = (event, context, callback) => {
   preHandler(createAccountHandler, event, context, callback);
};

//serverless methods for Challenge Phase

//done
//update status = challenge, record_status = not confirmed n projects_det
//create challenge in challenge table
//watch challenge event
//confirm challenge event

module.exports.challenge = (event, context, callback) => {
   preHandler(challengeHandler, event, context, callback);
};

module.exports.revertChallenge = (event, context, callback) => {
   preHandler(revertChallengeHandler, event, context, callback);
};


//done
//update record_status = confirmed in projects_det
//update challenge in challenge table
module.exports.confirmChallenge = (event, context, callback) => {
   preHandler(confirmChallengeHandler, event, context, callback);
};

//not started
//update status = PROMOTED, record_status = ''

//module.exports.revertChallenge = (event, context, callback) => {
   //preHandler(revertChallengeHandler, event, context, callback);
//};

module.exports.challengeConclusion = (event, context, callback) => {
   preHandler(challengeConclusionHandler, event, context, callback);
};


//done need to test from ui
module.exports.commitVote = (event, context, callback) => {
   preHandler(commitVoteHandler, event, context, callback);
};

module.exports.revertCommitVote = (event, context, callback) => {
   preHandler(revertCommitVoteHandler, event, context, callback);
};

module.exports.confirmCommitVote = (event, context, callback) => {
   preHandler(confirmCommitVoteHandler, event, context, callback);
};

module.exports.revealVote = (event, context, callback) => {
   preHandler(revealVoteHandler, event, context, callback);
};

module.exports.confirmRevealVote = (event, context, callback) => {
   preHandler(confirmRevealVoteHandler, event, context, callback);
};






const preHandler = (handler, event, context, callback) => {
  console.log("event: "+event);
  console.log("inside preHandler");
  if (!databaseMgr.isSecretsSet() || !bucketMgr.isSecretsSet()) {
    const kms = new AWS.KMS();
    kms
      .decrypt({
        CiphertextBlob: Buffer(process.env.SECRETS, "base64")
      })
      .promise()
      .then(data => {
        const decrypted = JSON.parse(String(data.Plaintext));
        //ethereumMgr.setSecrets(decrypted);
        databaseMgr.setSecrets(decrypted);
        bucketMgr.setSecrets(decrypted);
        console.log("secrets:", decrypted);
        doHandler(handler, event, context, callback);
      });
  } else {
    //doHandler(handler, event, context, callback);
     doHandler(handler, event, context, callback);
    console.log("prehandler error");
  }
};


const doHandler = (handler, event, context, callback) => {

    //console.log("in doHandler with PG.HOST"+databaseMgr.PG_HOST);
    handler.handle(event, context, (err, resp) => {
      let response;
      console.log("doHandler resp: "+resp);

       if (err == null) {
         console.log("err is null and response is defined")
            response = {
              statusCode: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
              },
              body: JSON.stringify({
                status: "success",
                data: resp
              })
            };
            callback(null, response);
        } else {
          console.log("err or response is undefined")
          console.log(err);
            let code = 500;
           // if (err.code) code = err.code;
            let message = err;
            if (err.message) message = err.message;

            response = {
              code: code,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
              },
              body: JSON.stringify({
                status: "error",
                message: message
              })
             };
             callback({ code: 500, message: "no logs callback" });
          }

        console.log("doHanlder response: "+JSON.stringify(response));
        //callback(null, response);
    });
  }



