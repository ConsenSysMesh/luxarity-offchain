'use strict';
const DatabaseMgr = require('./lib/DatabaseMgr');
const GetRecordsHandler = require('./handlers/getRecordsHandler');
const AWS = require("aws-sdk");

let databaseMgr = new DatabaseMgr();
let getRecordsHandler = new GetRecordsHandler(databaseMgr);


module.exports.helloWorld = (event, context, callback) => {

  preHandler(event, context, callback);

};



const preHandler = (event, context, callback) => {
  //console.log(event);
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
        doHandler(event, context, callback);
      });
  } else {
    //doHandler(handler, event, context, callback);
     doHandler(event, context, callback);
    console.log("prehandler error");
  }

  console.log("secrets:PG_HOST2: "+databaseMgr.PG_HOST);
};

const doHandler = ( event, context, callback) => {

    console.log("in doHandler with PG.HOST"+databaseMgr.PG_HOST);
    getRecordsHandler.handle(event, context, (err, resp) => {
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
          //console.log(err);
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

