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

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'setAdminDates',
    text: 'select * from tst_orders where redemptionhash = $1',
    values: [body.redemptionHash]
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

    if (!this.PG_HOST) throw "no PG_HOST set";

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'setAdminDates',
    text: 'SELECT sum(donationamount) FROM tst_causes WHERE causeid = $1',
    values: [body.causeId]
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

  async totalDonations(body) {

    if (!this.PG_HOST) throw "no PG_HOST set";

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'setAdminDates',
    text: 'SELECT sum(donationamount) FROM tst_causes',
    values: []
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


  async insertOrder(body) {
    if (!this.PG_HOST) throw "no PG_HOST set";

    console.log("\nMade all input checks, in DatabaseMgr. insertOrder");


  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })


    const query = {
    name: 'insertOrder',
    text: "INSERT INTO tst_orders(orderid,ordernumber,customeremail,totalcost,redemptionhash,customeremail256,tokenuri,orderdate) \
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *",
    values: [body.orderId,body.orderNumber,body.customerEmail,body.totalprice,body.redemptionPinSHA256,body.customerEmailSHA256,body.tokenURI, body.orderDate]
  }

    try {
      await client.connect();
      const res = await client.query(query);
      console.log(res.rows[0].orderid);
      return res.rows[0].orderid;
    } catch (e) {
      throw e;
    } finally {
      await client.end();
    }
  }

    async insertDonation(causeid,causename,orderid,donationamount) {
    if (!this.PG_HOST) throw "no PG_HOST set";

    console.log("\nMade all input checks, in DatabaseMgr. insertOrder");

      const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })


      const query = {
        name: 'totalSold',
        text: 'SELECT sum(totalcost) FROM orders',
        values: []
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