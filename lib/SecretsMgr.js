const AWS = require("aws-sdk");

class SecretsMgr{

  constructor(){
    this.num = 5;
    this.secrets = null;
    console.log("Secrets Mgr constructor");
  };

  getSecrets() {

  console.log("inside getSecrets");

  const kms = new AWS.KMS();
  //const secrets;

  try{
    console.log("inside try");
    kms.decrypt({
        CiphertextBlob: Buffer(process.env.SECRETS, 'base64')
        }).promise()
        .then(data => {
          const decrypted = String(data.Plaintext);
          console.log("decrypted: "+decrypted);
          secrets = JSON.parse(decrypted);
          console.log("secrets.seed: "+secrets.SEED);
          
      })
  }catch(error){
  		console.log("AWS.KMS().decrypt error: "+error);
  		throw error;
  	}


  };


}

module.exports = SecretsMgr;