
class SecretsMgr{

  constructor(){
    this.num = 5;
    console.log("Secrets Mgr constructor");
  };

  async getSecrets(event, context, callback) {

  console.log("inside getSecrets");

  const kms = new AWS.KMS();
  let secrets;

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
          callback(null, secrets);
      })
  }catch(error){
  		console.log("AWS.KMS().decrypt error: "+error);
  		throw error;
  	}

  };


}

module.exports = SecretsMgr;