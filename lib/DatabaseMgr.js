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
        return res.rows[0];
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
      }catch(e){
        throw e
      }
    try{
        const res = await client.query(query);
        console.log("res: "+JSON.stringify(res.rows));
         //console.log("res: "+res.rows);
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

  async getProjectsUser(body) {

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
    text: 'SELECT * FROM PROJECTS_DET WHERE submitter_id = $1 and (record_status IS NULL OR record_status != \'not_confirmed\')',
    values: [body.userId]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
      }catch(e){
        throw e
      }
    try{
        const res = await client.query(query);
        console.log("res: "+JSON.stringify(res.rows));
         //console.log("res: "+res.rows);
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

  async updateUserCreds(body) {

    console.log("inside updateUserCreds : ");

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
    text: 'UPDATE USERS SET password = $1 WHERE user_id = $2 RETURNING *',
    values: [body.password, body.userId]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
      }catch(e){
        throw e
      }
    try{
        const res = await client.query(query);
        console.log("res: "+JSON.stringify(res.rows));
         //console.log("res: "+res.rows);
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
        return res.rows[0];
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
  	text: 'INSERT INTO PROJECTS_DET (title, location, description_short, description_long, team_number, team_name, submitter_id, submission_date, status, tags, media_title, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
  	values: [body.title, body.location, body.descriptionShort, body.descriptionLong, body.teamNumber, body.teamName, body.submitterId, body.submission_date, 'APPLIED', body.tags, body.mediaTitle, body.images]
	}

    try {
      console.log("inside client.connect try");
        await client.connect();
      }catch(e){
        throw e
      }
    try{
        const res = await client.query(query);
        console.log("res: "+JSON.stringify(res.rows));
         //console.log("res: "+res.rows);
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

  async createUser(body) {

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
    name: 'create-user',
    text: 'INSERT INTO USERS (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    values: [body.name, body.email, body.password]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
      }catch(e){
        throw e
      }
    try{
        const res = await client.query(query);
        console.log("res: "+JSON.stringify(res.rows));
         //console.log("res: "+res.rows);
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

  //success
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
    text: 'UPDATE projects_det SET record_status = \'watching_event\', status = \'PROMOTED\', listinghash = $2, promoter_publickey = $3 WHERE project_Id = $1 RETURNING *',
    values: [body.projectId, body.listingHash, body.promoterPublicKey]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows[0];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async promoteEventConfirm(body) {

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
    text: 'UPDATE projects_det SET record_status = \'confirmed\' WHERE listinghash = $1 RETURNING *',
    values: [body.listingHash]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows[0];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  //success
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
    text: 'UPDATE projects_det SET record_status = \'\', status = \'APPLIED\' WHERE listingHash = $1 RETURNING *',
    values: [body.listingHash]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows[0];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  //success
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
        return res.rows[0];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };



  //success
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
    text: 'SELECT user_id, user_type, user_publickey, name, email, password FROM USERS WHERE user_id = $1',
    values: [body.userId]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
      }catch(e){
        throw e
      }
    try{
        const res = await client.query(query);
        console.log("res: "+JSON.stringify(res.rows));
         //console.log("res: "+res.rows);
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

  //challenge workflow
   async challenge(body) {

    console.log("inside challenge : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'challenge',
    text: 'INSERT INTO CHALLENGES (project_id, user_id, submission_date, listinghash, challenger, record_status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
    values: [body.projectId, body.userId, body.submissionDate, body.listingHash, body.challengerPublicKey, 'watching_event']
  }

    try {
      console.log("inside client.connect challenge try");
        await client.connect();
        const res = await client.query(query);
        console.log("projectChallenge res: "+res.rows[0]);
        return res.rows[0]
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async projectChallenge(body) {

    console.log("inside projectChallenge : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'challenge',
    text: 'UPDATE PROJECTS_DET set status = \'CHALLENGED\', record_status = \'watching_event\' where project_id = $1 RETURNING *',
    values: [body.projectId]
  }

    try {
      console.log("inside client.connect projectChallenge try");
        await client.connect();
        const res = await client.query(query);
        console.log("projectChallenge res: "+res.rows[0]);
        return res.rows[0]
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  
  async challengeEventConfirm(body) {

    console.log("inside challengeEventConfirm : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'challengeEventConfirm',
    text: 'UPDATE CHALLENGES set  challengeid = $2, data = $3, commitEndDate = $4, revealEndDate = $5, challenger = $6, record_status = $7 where listinghash = $1  RETURNING *',
    values: [body.listingHash, body.challengeID, body.data, body.commitEndDate,  body.revealEndDate,  body.challenger, 'confirmed']
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows[0];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async challengeProjectEventConfirm(body) {

    console.log("inside challengeEventConfirm : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'challengeEventConfirm',
    text: 'UPDATE  PROJECTS_DET set record_status = $2 WHERE project_id = $1 RETURNING *',
    values: [body.projectId, 'confirmed']
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows[0];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async commitVote(body) {

    console.log("inside commitVote : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'commitVote',
    text: 'INSERT INTO VOTES (poll_id, secret_hash, salt, project_id, user_id, voter_publickey, record_status) VALUES($1,$2,$3,$4, $5, $6, $7) RETURNING *',
    values: [body.pollId, body.secretHash, body.salt, body.projectId,  body.userId,  body.voterPublicKey, 'watching_event']
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[1]);
        return res.rows[0];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };

  async voteCommitEventConfirmed(body) {

    console.log("inside voteCommitEventConfirmed : ");

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
    name: 'voteCommitEventConfirmed',
    text: 'UPDATE VOTES SET record_status = \'confirmed\' WHERE poll_id = $1 RETURNING *',
    values: [body.pollId]
  }

    try {
      console.log("inside client.connect try");
        await client.connect();
        const res = await client.query(query);
        console.log("res: "+res.rows[0]);
        return res.rows[0];
      } catch (e) {
        throw e;
      } finally {
        await client.end();
      }

  };


}

module.exports = DatabaseMgr;