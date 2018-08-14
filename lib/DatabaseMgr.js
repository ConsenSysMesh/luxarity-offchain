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


  async getTestRecords() {

    console.log("inside getRecords : ");

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

  //success
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
        let SQL = 'SELECT * FROM projects_det WHERE record_status IS NULL OR record_status != \'not_confirmed\'';
        const res = await client.query(SQL);
        console.log("res: "+res.rows[1]);
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  //success
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
  	text: 'SELECT * FROM PROJECTS_DET WHERE project_id = $1 and (record_status IS NULL OR record_status != \'not_confirmed\')',
  	values: [projectId]
	}

    try {
    	console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  //not working
  async createAccount(body) {

    console.log("inside createAccount : ");

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'create-account',
    text: 'INSERT INTO ACCOUNT_CREATE (user_id, project_category, project_problem, project_approach, project_stage, project_impact, funding_goal, team_info) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) Returning *',
    values: [body.userId, body.projectCategory, body.projectProblem, body.projectApproach, body.projectStage, body.projectImpact, body.fundingGoal, body.teamInfo]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  //s3 image 
  async createProject(body) {

    console.log("inside getProjectDets : ");

 const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

    //project_id is autoincremented 
    //title, location, description_short, 
    //description_long, team_number, team_name, submitter_id, submission_date, status, tags, media_title, images

   const query = {
  	name: 'create-project',
  	text: 'INSERT INTO PROJECTS_DET (title, location, description_short, description_long, team_number, team_name, submitter_id, submission_date, status, tags, media_title, images, deliverer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
  	values: [body.title, body.location, body.descriptionShort, body.descriptionLong, body.teamNumber, body.teamName, body.submitterId, body.submission_date, body.status, body.tags, body.mediaTitle, body.images, body.deliverer_id]
	}

    try {
    	console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  //not working
  async promoteProject(body) {

    console.log("inside promoteProject : ");

    const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })
    //project_id is autoincremented 
    //title, location, description_short, 
    //description_long, team_number, team_name, submitter_id, submission_date, status, tags, media_title, images

   const query = {
    name: 'promote-project',
    text: 'UPDATE projects_det SET record_status = \'not_confirmed\', status = \'PROMOTED\' WHERE project_Id = $1 RETURNING *',
    values: [body.projectId]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async revertPromoteProject(body) {

    console.log("inside revertPromoteProject : ");

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

    //project_id is autoincremented 
    //title, location, description_short, 
    //description_long, team_number, team_name, submitter_id, submission_date, status, tags, media_title, images

   const query = {
    name: 'promote-project',
    text: 'UPDATE projects_det SET record_status = \'\', status = \'APPLIED\' WHERE project_Id = $1 RETURNING *',
    values: [body.projectId]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async confirmProject(body) {

    console.log("inside confirmProject : ");

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

    //project_id is autoincremented 
    //title, location, description_short, 
    //description_long, team_number, team_name, submitter_id, submission_date, status, tags, media_title, images

   const query = {
    name: 'promote-project',
    text: 'UPDATE projects_det SET record_status = \'confirmed\', listinghash = $1, promoter_publickey = $2, WHERE project_Id = $3 RETURNING *',
    values: [body.listingHash, body.promoterPublickey, body.projectId]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
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
    text: 'INSERT INTO USERS (user_type, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [ body.userType, body.userName, body.userEmail, body.userPassword]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
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
    text: 'SELECT user_id, user_type, user_publickey, name, email, password FROM USERS WHERE email = $1',
    values: [body.userEmail]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows;
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };
}

module.exports = DatabaseMgr;