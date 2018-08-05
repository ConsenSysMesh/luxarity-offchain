//const { Client } = require('pg');
const client = require('../lib/DatabaseMgr');

class getRecordsHandler{

  constructor(){
    this.num = 5;
    console.log("constructor");
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