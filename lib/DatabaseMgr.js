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

  //add sql as input
  async getTestRecords() {

    console.log("inside getRecords : ");
    //console.log(this.PG_HOST)
  	//console.log(this.PG_DATABASE)
  	//console.log(this.PG_USER)
  	//console.log(this.PG_PASSWORD )
  	//console.log(this.PG_PORT )

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

    try {
    	console.log("inside client.connect try");
        await client.connect();
        const res = await client.query("select * from test");
        console.log("res: "+res.rows[1]);
        //callback(null, res.rows[1]);
        //return res.rows[1];
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  //add sql as input
  async getAllProjectDets() {

    console.log("inside getProjectDets : ");

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

    try {
    	console.log("inside client.connect try");
        await client.connect();
        let SQL = 'SELECT * FROM PROJECTS_DET';
        const res = await client.query(SQL);
        console.log("res: "+res.rows[1]);
        //callback(null, res.rows[1]);
        //return res.rows[1];
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async getProjectDets(projectId) {

    console.log("inside getProjectDets : ");

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
  	name: 'get-project',
  	text: 'SELECT * FROM PROJECTS_DET WHERE project_id = $1',
  	values: [projectId]
	}

    try {
    	console.log("inside client.connect try");
        await client.connect();
        //let SQL = 'SELECT project_id, title, description_short, description_long, submitter_id, submission_date, status FROM PROJECTS_DET';
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        //callback(null, res.rows[1]);
        //return res.rows[1];
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async createProject(body) {

    console.log("inside getProjectDets : ");

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

      //project_id, title, location, description_short, 
    //description_long, team_number, team_name, submitter_id, submission_date, status, tags, media_title, images

   const query = {
  	name: 'create-project',
  	text: 'INSERT INTO PROJECTS_DET (project_id, title, location, description_short, description_long, team_number, team_name, submitter_id, submission_date, status, tags, media_title, images, deliverer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
  	values: [body.projectId, body.title, body.location, body.descriptionShort, body.descriptionLong, body.teamNumber, body.teamName, body.submitterId, body.submission_date, body.status, body.tags, body.mediaTitle, body.images, body.deliverer_id]
	}

    try {
    	console.log("inside client.connect try");
        await client.connect();
        //let SQL = 'SELECT project_id, title, description_short, description_long, submitter_id, submission_date, status FROM PROJECTS_DET';
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        //callback(null, res.rows[1]);
        //return res.rows[1];
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

   async createUser(body) {

    console.log("inside getProjectDets : ");

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

   const query = {
    name: 'create-user',
    text: 'INSERT INTO USERS (user_id, user_type, name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [body.userId, body.userType, body.userName, body.userEmail, body.userPassword]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        //let SQL = 'SELECT project_id, title, description_short, description_long, submitter_id, submission_date, status FROM PROJECTS_DET';
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        //callback(null, res.rows[1]);
        //return res.rows[1];
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async getUser(body) {

    console.log("inside getUser : "+body.userEmail);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'get-user',
    text: 'SELECT user_id, user_type, name, email, password FROM USERS WHERE email = $1',
    values: [body.userEmail]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        //let SQL = 'SELECT project_id, title, description_short, description_long, submitter_id, submission_date, status FROM PROJECTS_DET';
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        //callback(null, res.rows[1]);
        //return res.rows[1];
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };
}

module.exports = DatabaseMgr;