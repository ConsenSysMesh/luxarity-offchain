const { Client } = require('pg');
//const SecretsMgr = require('SecretsMgr');

//const secretsMgr = new SecretsMgr();
//const secrets = secretsMgr.getSecrets();

const client = new Client({
      host     : 'testpostgresdb.c0efkqdxrumb.us-west-1.rds.amazonaws.com',
      database     : 'postgres', 
      user : 'testDBuser',
      password : 'Social1mp4ct',
      port     : '5432'
    })

/*const client = new Client({
      host     : secrets.pg_host,
      database     : secrets.pg_database, 
      user : secrets.pg_user,
      password : secrets.pg_password,
      port     : secrets.pg_port 
    })*/

module.exports = client;