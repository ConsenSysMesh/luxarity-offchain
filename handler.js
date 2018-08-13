'use strict';
const AWS = require("aws-sdk");

const DatabaseMgr = require('./lib/DatabaseMgr');
const EthereumMgr = require('./lib/ethereumMgr');
//const EthereumMgr = require('./lib/EthereumMgr');
const GetRecordsHandler = require('./handlers/getRecordsHandler');
const GetRecordsHandlerEth = require('./handlers/getRecordsHandlerEth');
const AllProjectDetHandler = require('./handlers/allProjectDetHandler');
const ProjectDetHandler = require('./handlers/projectDetHandler');
const CreateProjectHandler = require('./handlers/createProjectHandler');
const CreateUserHandler = require('./handlers/createUserHandler');
const UserHandler = require('./handlers/userHandler');
const RelayHandler = require('./handlers/relayHandler');
const PromotePojectHandler = reequire('./handlers/promoteProjectHandler');

let databaseMgr = new DatabaseMgr();
//let ethereumMgr = new EthereumMgr();
let ethereumMgr = new EthereumMgr();
let getRecordsHandler = new GetRecordsHandler(databaseMgr);
//let getRecordsHandlerEth = new GetRecordsHandlerEth(databaseMgr, ethereumMgr);
let allProjectDetHandler = new AllProjectDetHandler(databaseMgr);
let projectDetHandler = new ProjectDetHandler(databaseMgr);
let createProjectHandler = new CreateProjectHandler(databaseMgr);
let createUserHandler = new CreateUserHandler(databaseMgr);
let userHandler = new UserHandler(databaseMgr);
let relayHandler = new RelayHandler(ethereumMgr);
let promoteProjectHandler = new promoteProjectHandler(databaseMgr);

//done
module.exports.helloWorld = (event, context, callback) => {
   preHandler(getRecordsHandler, event, context, callback);
};

module.exports.helloWorldEth = (event, context, callback) => {
   //preHandler(getRecordsHandlerEth, event, context, callback);
   console.log("fix import testEthMgr.js");
};

//done
module.exports.allProjectDet = (event, context, callback) => {
   preHandler(allProjectDetHandler, event, context, callback);
};

//done
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

//update project when promoted
module.exports.promoteProject = (event, context, callback) => {
   preHandlerSensui(promoteProjectHandler, event, context, callback);
};

const preHandler = (handler, event, context, callback) => {
  console.log("event: "+event);
  console.log("inside preHandler");
  if (!databaseMgr.isSecretsSet() ) {
    const kms = new AWS.KMS();
    kms
      .decrypt({
        CiphertextBlob: Buffer(process.env.SECRETS, "base64")
      })
      .promise()
      .then(data => {
        const decrypted = String(data.Plaintext);
        //ethereumMgr.setSecrets(JSON.parse(decrypted));
        databaseMgr.setSecrets(JSON.parse(decrypted));
        console.log("secrets:PG_HOST: "+databaseMgr.PG_HOST);
        doHandler(handler, event, context, callback);
      });
  } else {
    //doHandler(handler, event, context, callback);
     doHandler(handler, event, context, callback);
    console.log("prehandler error");
  }

  console.log("secrets:PG_HOST2: "+databaseMgr.PG_HOST);
};

const preHandlerSensui = (handler, event, context, callback) => {
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

  

