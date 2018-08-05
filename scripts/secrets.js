
const AWS = require("aws-sdk");
const fs = require('fs')

//const kms = new AWS.KMS({ region: 'us-west-1'});
//const secretPath = './kms-secrets.develop.us-west-1.yml';
//const encryptedSecret = fs.readFileSync(secretPath);

const kms = new AWS.KMS();

/*var params = {
  CiphertextBlob: new Buffer(process.env.SECRETS, 'base64')
};
kms.decrypt(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});*/

kms.decrypt({
  CiphertextBlob: Buffer(process.env.SECRETS, 'base64')
}).promise()
.then(data => {
  const decrypted = String(data.Plaintext);
  const secrets = JSON.parse(decrypted);
  console.log("secrets: "+secrets);
})