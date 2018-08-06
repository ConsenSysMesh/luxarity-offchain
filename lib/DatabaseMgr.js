const { Client } = require('pg');

/*const client = new Client({
      host     : 'testpostgresdb.c0efkqdxrumb.us-west-1.rds.amazonaws.com',
      database     : 'postgres', 
      user : 'testDBuser',
      password : 'Social1mp4ct',
      port     : '5432'
    })*/


class DatabaseMgr {

  constructor(){
  	this.PG_HOST = null;
  	this.PG_DATABASE = null;
  	this.PG_USER = null;
  	this.PG_PASSWORD = null;
  	this.PG_PORT = null;
  	this.client = null;

    console.log("DatabaseMgr Mgr constructor");
  };


  isSecretsSet() {
    return this.PG_HOST !== null ;
  }

  setSecrets(secrets) {
    /*
      VERY IMPORTANT - THIS IS HOW WE SEND TX WITH SERVICE OF USER
        1. Sets PG_URL so that we can send database queries (from our encrypted secrets)
        2. Sets the wallet seed from our encrypted secrets (the funding wallet seed)
        3. Uses HDPrivateKey repo to do appropiate signer activities
    */
    this.PG_HOST = secrets.PG_HOST;
    this.PG_DATABASE = secrets.PG_DATABASE;
    this.PG_USER = secrets.PG_USER;
    this.PG_PASSWORD = secrets.PG_PASSWORD;
    this.PG_PORT = secrets.PG_PORT;
  };

  //add sql as input
  async getRecords() {

  console.log("inside getRecords");

  const client = new Client({
      host     : 'testpostgresdb.c0efkqdxrumb.us-west-1.rds.amazonaws.com',
      database     : 'postgres', 
      user : 'testDBuser',
      password : 'Social1mp4ct',
      port     : '5432'
    })

  /*const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE, 
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })*/

    //databaseMgr.setClientConfig();
    //client = DatabaseMgr.client;

    try {
        await client.connect();
        const res = await client.query("select * from test");
        console.log("res: "+res.rows[1]);
        //callback(null, res.rows[1]);
        return res.rows[1];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };



}

module.exports = DatabaseMgr;