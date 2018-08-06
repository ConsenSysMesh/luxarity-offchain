const { Client } = require('pg');
const AWS = require("aws-sdk");
//const DatabaseMgr = require('../lib/DatabaseMgr');
//databaseMgr = new DatabaseMgr();

class getRecordsHandler{

  constructor(){
    this.num = 5;
    this.PG_HOST = null;
    this.PG_DATABASE = null;
    this.PG_USER = null;
    this.PG_PASSWORD = null;
    this.PG_PORT = null;
    console.log("constructor");
  };

  getSecrets() {

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
          this.PG_HOST = secrets.PG_HOST;
          this.PG_DATABASE = secrets.PG_DATABASE;
          this.PG_USER = secrets.PG_USER;
          this.PG_PASSWORD = secrets.PG_PASSWORD;
          this.PG_PORT = secrets.PG_PORT;
          console.log("this.port: "+this.PG_PORT)
          
      })
  }catch(error){
      console.log("AWS.KMS().decrypt error: "+error);
      throw error;
    }

     console.log("this.port: "+this.PG_PORT)

  };


  async getRecords(event, context, callback) {

  console.log("inside getRecords");

  /*const client = new Client({
      host     : 'testpostgresdb.c0efkqdxrumb.us-west-1.rds.amazonaws.com',
      database     : 'postgres', 
      user : 'testDBuser',
      password : 'Social1mp4ct',
      port     : '5432'
    })*/

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE, 
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

    //databaseMgr.setClientConfig();
    //client = DatabaseMgr.client;

    try {
        await client.connect();
        const res = await client.query("select * from test");
        console.log("res: "+res.rows);
        callback(null, res.rows[1]);
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

};

module.exports = getRecordsHandler;