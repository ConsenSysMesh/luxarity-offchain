
const AWS = require("aws-sdk");

var lambda = new AWS.Lambda();

 var params = {
  FunctionName: "createProject", 
  Marker: "", 
  MaxItems: 123
 };
 lambda.listVersionsByFunction(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   /*
   data = {
    NextMarker: "", 
    Versions: [
    ]
   }
   */
 });