const { Client } = require('pg');


class DatabaseMgr {

  constructor(){
    this.PG_HOST = null;
    this.PG_DATABASE = null;
    this.PG_USER = null;
    this.PG_PASSWORD = null;
    this.PG_PORT = null;
    

    console.log("DatabaseMgr Mgr constructor");
  };


  isSecretsSet() {
    return this.PG_HOST !== null ;
  }

  setSecrets(secrets) {

    this.PG_HOST = secrets.PG_HOST;
    this.PG_DATABASE = secrets.PG_DATABASE;
    this.PG_USER = secrets.PG_USER;
    this.PG_PASSWORD = secrets.PG_PASSWORD;
    this.PG_PORT = secrets.PG_PORT;
  };



  async ordersByRedemptionhash(body) {

  console.log("inside ordersByRedemptionhash : ");
  console.log(body.sql)
  console.log(body.values.toString())

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'setAdminDates',
    text: 'select * from orders where redemptionhash = $1',
    values: body.redemptionHash
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        if(res.rows === undefined || res.rows.length == 0){
          throw new Error('no rows returned');
        }else{
          return res.rows;
        }
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

   async donationsByCause(body) {

  console.log("inside donationsByCause : ");
  console.log(body.sql)
  console.log(body.values.toString())

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'setAdminDates',
    text: 'SELECT sum(donationamount) FROM causes WHERE causeid = $1',
    values: body.causeId
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        if(res.rows === undefined || res.rows.length == 0){
          throw new Error('no rows returned');
        }else{
          return res.rows;
        }
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };



}

module.exports = DatabaseMgr;