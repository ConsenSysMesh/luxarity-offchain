'use strict';
const AWS = require("aws-sdk");

const DatabaseMgr = require('./lib/DatabaseMgr');
const EthereumMgr = require('./lib/EthereumMgr');
const BucketMgr = require('./lib/BucketMgr');
const GetRecordsHandler = require('./handlers/getRecordsHandler');
const GetRecordsHandlerEth = require('./handlers/getRecordsHandlerEth');
const AllProjectDetHandler = require('./handlers/allProjectDetHandler');
const ProjectDetHandler = require('./handlers/projectDetHandler');
const CreateProjectHandler = require('./handlers/createProjectHandler');
const CreateUserHandler = require('./handlers/createUserHandler');
const UserHandler = require('./handlers/userHandler');
const RelayHandler = require('./handlers/relayHandler');
const PromoteProjectHandler = require('./handlers/promoteProjectHandler');
const CreateAccountHandler = require('./handlers/createAccountHandler');
const ConfirmProjectHandler = require('./handlers/confirmProjectHandler');
const RevertPromoteProjectHandler = require('./handlers/revertPromoteProjectHandler');
const ChallengeHandler = require('./handlers/challengeHandler');

const databaseMgr = new DatabaseMgr();
const ethereumMgr = new EthereumMgr();
const bucketMgr = new BucketMgr();
const getRecordsHandler = new GetRecordsHandler(databaseMgr);
// const getRecordsHandlerEth = new GetRecordsHandlerEth(databaseMgr, ethereumMgr);
const allProjectDetHandler = new AllProjectDetHandler(databaseMgr);
const projectDetHandler = new ProjectDetHandler(databaseMgr);
const createProjectHandler = new CreateProjectHandler(databaseMgr, bucketMgr);
const createUserHandler = new CreateUserHandler(databaseMgr);
const userHandler = new UserHandler(databaseMgr);
const relayHandler = new RelayHandler(ethereumMgr);
const promoteProjectHandler = new PromoteProjectHandler(databaseMgr);
const createAccountHandler = new CreateAccountHandler(databaseMgr);
const confirmProjectHandler = new ConfirmProjectHandler(databaseMgr);
const revertPromoteProjectHandler = new RevertPromoteProjectHandler(databaseMgr);
const challengeHandler = new ChallengeHandler(databaseMgr);

//done
module.exports.helloWorld = (event, context, callback) => {
   preHandler(getRecordsHandler, event, context, callback);
};

module.exports.helloWorldEth = (event, context, callback) => {
   //preHandler(getRecordsHandlerEth, event, context, callback);
   console.log("fix import testEthMgr.js");
};

//serverless methods for Pre-tcr Submission Phase and Promote Project Phase
//fix for not_Confirmed
module.exports.allProjectDet = (event, context, callback) => {
   preHandler(allProjectDetHandler, event, context, callback);
};

//fix for not_Confirmed
module.exports.projectDet = (event, context, callback) => {
   preHandler(projectDetHandler, event, context, callback);
};

//done
module.exports.createProject = (event, context, callback) => {
   preHandler(createProjectHandler, event, context, callback);
};

//done
module.exports.createUser = (event, context, callback) => {
   preHandler(createUserHandler, event, context, callback);
};

//done
module.exports.user = (event, context, callback) => {
   preHandler(userHandler, event, context, callback);
};

//done
module.exports.relay = (event, context, callback) => {
   preHandlerSensui(relayHandler, event, context, callback);
};

//done
module.exports.promoteProject = (event, context, callback) => {
   preHandler(promoteProjectHandler, event, context, callback);
};

//done
module.exports.confirmProject = (event, context, callback) => {
   preHandler(confirmProjectHandler, event, context, callback);
};

//done
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
module.exports.challenge = (event, context, callback) => {
   preHandler(challengeHandler, event, context, callback);
};

//not started
//update record_status = confirmed in projects_det
//update challenge in challenge table
module.exports.confirmChallenge = (event, context, callback) => {
   //preHandler(confirmChallengeHandler, event, context, callback);
};

//not started
//update status = PROMOTED, record_status = ''

module.exports.revertChallenge = (event, context, callback) => {
   //preHandler(revertChallengeHandler, event, context, callback);
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

const preHandlerSensui = (handler, event, context, callback) => {
  console.log("in prehandlerSensui");
  console.log(event);
  if (!ethereumMgr.isSecretsSet() || !databaseMgr.isSecretsSet()) {
    const kms = new AWS.KMS();
    kms
      .decrypt({
        CiphertextBlob: Buffer(process.env.SECRETS, "base64")
      })
      .promise()
      .then(data => {
        const decrypted = String(data.Plaintext);
        ethereumMgr.setSecrets(JSON.parse(decrypted));
        //authMgr.setSecrets(JSON.parse(decrypted));
        doHandler(handler, event, context, callback);
      });
  } else {
    doHandler(handler, event, context, callback);
  }
};

const doHandler = (handler, event, context, callback) => {

    console.log("in doHandler with PG.HOST"+databaseMgr.PG_HOST);
    handler.handle(event, context, (err, resp) => {
      let response;
      console.log("response: "+response);

       if (err == null) {
            response = {
              statusCode: 200,
              body: JSON.stringify({
                status: "success",
                data: resp
              })
            };
        } else {
          console.log(err);
            let code = 500;
            if (err.code) code = err.code;
            let message = err;
            if (err.message) message = err.message;

            response = {
              statusCode: code,
              body: JSON.stringify({
                status: "error",
                message: message
              })
             };
          }

        callback(null, response);
    });
  }



