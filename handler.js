'use strict';
const AWS = require("aws-sdk");

//lib handlers
const DatabaseMgr = require('./lib/DatabaseMgr');

//handlers
const OrderByRhHandler = require('./handlers/orderByRhHandler');
const orderByRhHandler = new OrderByRhHandler(databaseMgr);

const DonationsByCauseHandler = require('./handlers/donationsByCauseHandler');
const donationsByCauseHandler = new DonationsByCauseHandler(databaseMgr);

//

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

module.exports.orderByRedemptionHash = (event, context, callback) => {
   preHandler(orderByRhHandler, event, context, callback);
};

module.exports.donationsByCause = (event, context, callback) => {
   preHandler(donationsByCauseHandler, event, context, callback);
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



