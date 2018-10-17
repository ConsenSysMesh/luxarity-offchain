'use strict';
const AWS = require("aws-sdk");

//lib handlers
const DatabaseMgr = require('./lib/DatabaseMgr');

//project handlers
const AllProjectDetHandler = require('./handlers/allProjectDetHandler');
const ProjectDetHandler = require('./handlers/projectDetHandler');
const CreateProjectHandler = require('./handlers/createProjectHandler');
const ProjectsUserHandler = require('./handlers/projectsUserHandler');

//user handlers
const CreateUserHandler = require('./handlers/createUserHandler');
const UserHandler = require('./handlers/userHandler');
const UpdateUserCredsHandler = require('./handlers/updateUserCredsHandler');
const UserLoginHandler = require('./handlers/userLoginHandler');

//promote handlers
const PromoteProjectHandler = require('./handlers/promoteProjectHandler');
//const ConfirmProjectHandler = require('./handlers/confirmProjectHandler');
const RevertPromoteProjectHandler = require('./handlers/revertPromoteProjectHandler');

//challenge handlers
const GetMaxChallengeIdHandler = require('./handlers/getMaxChallengeIdHandler');
const ChallengesProjectIdHandler = require('./handlers/challengesProjectIdHandler');
const ChallengeHandler = require('./handlers/challengeHandler');
//const ConfirmChallengeHandler = require('./handlers/confirmChallengeHandler');
const RevertChallengeHandler = require('./handlers/revertChallengeHandler');

//vote handlers
const VotesProjIdChallIdHandler = require('./handlers/votesProjIdChallIdHandler');

const CommitVoteHandler = require('./handlers/commitVoteHandler');
//const ConfirmCommitVoteHandler = require('./handlers/confirmCommitVoteHandler');
const RevertCommitVoteHandler = require('./handlers/revertCommitVoteHandler');

const RevealVoteHandler = require('./handlers/revealVoteHandler');
//const ConfirmRevealVoteHandler = require('./handlers/confirmRevealVoteHandler');
const RevertRevealVoteHandler = require('./handlers/revertRevealVoteHandler');


//const ChallengeConclusionHandler = require('./handlers/challengeConclusionHandler');
//const ConfirmTxHandler = require('./handlers/confirmTxHandler');
//const GetRecordsHandler = require('./handlers/getRecordsHandler');
//const CreateProjectS3Handler = require('./handlers/createProjectS3Handler');
//const IntegrateChallengeWatchHandler = require('./handlers/integrateChallengeWatchHandler');
//const RunSleepHandler = require('./handlers/runSleepHandler');
//const TestHandler = require('./handlers/testHandler');
//const WatchEventHandler = require('./handlers/watchEventHandler');
//const IntegratePromoteWatchHandler = require('./handlers/integratePromoteWatchHandler');
//const CreateAccountHandler = require('./handlers/createAccountHandler');
//const RelayHandler = require('./handlers/relayHandler');

const databaseMgr = new DatabaseMgr();
const bucketMgr = new BucketMgr();

const allProjectDetHandler = new AllProjectDetHandler(databaseMgr);
const projectDetHandler = new ProjectDetHandler(databaseMgr);
const createProjectHandler = new CreateProjectHandler(databaseMgr, bucketMgr);
const projectsUserHandler = new ProjectsUserHandler(databaseMgr);

const createUserHandler = new CreateUserHandler(databaseMgr);
const userHandler = new UserHandler(databaseMgr);
const updateUserCredsHandler = new UpdateUserCredsHandler(databaseMgr);
const userLoginHandler = new UserLoginHandler(databaseMgr);

const promoteProjectHandler = new PromoteProjectHandler(databaseMgr);
//const confirmProjectHandler = new ConfirmProjectHandler(databaseMgr);
const revertPromoteProjectHandler = new RevertPromoteProjectHandler(databaseMgr);

const getMaxChallengeIdHandler = new GetMaxChallengeIdHandler(databaseMgr);
const challengesProjectIdHandler = new ChallengesProjectIdHandler(databaseMgr);
const challengeHandler = new ChallengeHandler(databaseMgr);
//const confirmChallengeHandler = new ConfirmChallengeHandler(databaseMgr);
const revertChallengeHandler = new RevertChallengeHandler(databaseMgr);


const votesProjIdChallIdHandler = new VotesProjIdChallIdHandler(databaseMgr);

const commitVoteHandler = new CommitVoteHandler(databaseMgr);
//const confirmCommitVoteHandler = new ConfirmCommitVoteHandler(databaseMgr);
const revertCommitVoteHandler = new RevertCommitVoteHandler(databaseMgr);

const revealVoteHandler = new RevealVoteHandler(databaseMgr);
//const confirmRevealVoteHandler = new ConfirmRevealVoteHandler(databaseMgr);
const revertRevealVoteHandler = new RevertRevealVoteHandler(databaseMgr);

//const challengeConclusionHandler = new ChallengeConclusionHandler(databaseMgr);
//const confirmTxHandler = new ConfirmTxHandler(databaseMgr);
//const getRecordsHandler = new GetRecordsHandler(databaseMgr);
//const createAccountHandler = new CreateAccountHandler(databaseMgr);
//const watchEventHandler = new WatchEventHandler();
//const integratePromoteWatchHandler = new IntegratePromoteWatchHandler(databaseMgr);
//const testHandler = new TestHandler(databaseMgr);
//const runSleepHandler = new RunSleepHandler();
//const integrateChallengeWatchHandler = new IntegrateChallengeWatchHandler(databaseMgr);
//const createProjectS3Handler = new CreateProjectS3Handler(databaseMgr, bucketMgr);

//get log handlers
const GetLogsApplicationHandler = require('./handlers/getLogsApplicationHandler');
const getLogsApplicationHandler = new GetLogsApplicationHandler(databaseMgr);
const GetLogsChallengeHandler = require('./handlers/getLogsChallengeHandler');
const getLogsChallengeHandler = new GetLogsChallengeHandler(databaseMgr);
const GetLogsCommitVoteHandler = require('./handlers/getLogsCommitVoteHandler');
const getLogsCommitVoteHandler = new GetLogsCommitVoteHandler(databaseMgr);
const GetLogsRevealVoteHandler = require('./handlers/getLogsRevealVoteHandler');
const getLogsRevealVoteHandler = new GetLogsRevealVoteHandler(databaseMgr);
const GetLogsChallSuccessHandler = require('./handlers/getLogsChallSuccessHandler');
const getLogsChallSuccessHandler = new GetLogsChallSuccessHandler(databaseMgr);
const GetLogsChallFailHandler = require('./handlers/getLogsChallFailHandler');
const getLogsChallFailHandler = new GetLogsChallFailHandler(databaseMgr);

const CreateCommentHandler = require('./handlers/createCommentHandler');
const createCommentHandler = new CreateCommentHandler(databaseMgr);

const ProjectCommentsHandler = require('./handlers/projectCommentsHandler');
const projectCommentsHandler = new ProjectCommentsHandler(databaseMgr);

const SetAdminDatesHandler = require('./handlers/setAdminDatesHandler');
const setAdminDatesHandler = new SetAdminDatesHandler(databaseMgr);

const GetAdminDatesHandler = require('./handlers/getAdminDatesHandler');
const getAdminDatesHandler = new GetAdminDatesHandler(databaseMgr);

//notes:
// before tcr need:
// token.approve(regsistry), 
// token.approve(plcrVoting),
//voting.requestVotingRighs


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

module.exports.setAdminDates = (event, context, callback) => {
   preHandler(setAdminDatesHandler, event, context, callback);
};

module.exports.getAdminDates = (event, context, callback) => {
   preHandler(getAdminDatesHandler, event, context, callback);
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
        //console.log("secrets:", decrypted);
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
          //console.log(err);
            let code = 500;
            if (err.code) code = err.code;
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
             //callback({ code: 500, message: "no logs callback" });
             callback(response)
          }

        console.log("doHanlder response: "+JSON.stringify(response));
        //callback(null, response);
    });
  }



