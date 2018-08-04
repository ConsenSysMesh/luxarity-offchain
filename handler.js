'use strict';
//const { Client } = require('pg');
const GetRecordsHandler = require('./handlers/getRecordsHandler');

const getRecordsHandler = new GetRecordsHandler();


module.exports.helloWorld = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

module.exports.helloWorld2 = (event, context, callback) => {

  console.log("num: "+getRecordsHandler.num)
  //let reco = { 'error' : 'no reco error'};
  let reco;

  getRecordsHandler.getRecords(event, context, (err,resp) =>{
   
   console.log("in hw2 getRecordsHanlder.getRecords() "); 
   if (err == null){
      reco = resp;
   }
   else{
      reco = { 'error' : 'reco error'};
   }

    const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'helloworld2',
      data : reco
      //input: event,
    }),
    };

   callback(null, response);

  });

 
};



