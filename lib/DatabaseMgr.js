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

  //#########################################

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

  //#########################################

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
        //console.log("res: "+JSON.stringify(res.rows));
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

  async getUser(body) {

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
    text: 'SELECT * FROM USERS WHERE user_id = $1',
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
//
  async userLogin(body) {

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
    text: 'SELECT * FROM USERS WHERE (email = $1 and password = $2)',
    values: [body.email, body.password]
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
    text: 'INSERT INTO PROJECTS_DET (title, location, url, categories, start_date, end_date, problem_summary, problem_evidence, solution, stage, impact, funding, team, ready, workplan, risks, outcomes, outcome1, outcome2, outcome3, long_term_impact, benefits, learnings, budget_url, financial_sustainability, image_url, submitter_id, submission_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING *',
    values: [body.title, body.location, body.url, body.categories, body.startDate, body.endDate, body.problemSummary, body.problemEvidence, body.solution, body.stage, body.impact, body.funding, body.team, body.ready, body.workplan, body.risks, body.outcomes, body.outcome1, body.outcome2, body.outcome3, body.longTermImpact, body.benefits, body.learnings, body.budgetUrl, body.financialSustainability, body.imageUrl, body.submitterId, body.submissionDate, 'APPLIED']
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

  async createProjectVideo(body) {

    console.log("inside createProjectVideo : ");

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
    name: 'createProjectVideo',
    text: 'INSERT INTO PROJECTS_DET_NEW (title, location, url, categories, start_date, end_date, problem_summary, problem_evidence, solution, stage, impact, funding, team, ready, workplan, risks, outcomes, outcome1, outcome2, outcome3, long_term_impact, benefits, learnings, budget_url, financial_sustainability, image_url, video_url, submitter_id, submission_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30) RETURNING *',
    values: [body.title, body.location, body.url, body.categories, body.startDate, body.endDate, body.problemSummary, body.problemEvidence, body.solution, body.stage, body.impact, body.funding, body.team, body.ready, body.workplan, body.risks, body.outcomes, body.outcome1, body.outcome2, body.outcome3, body.longTermImpact, body.benefits, body.learnings, body.budgetUrl, body.financialSustainability, body.imageUrl, body.videoUrl, body.sudmitterId, body.submissionDate, 'APPLIED']
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

  //#########################################

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
    text: 'INSERT INTO USERS (name, email, password, user_type) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [body.name, body.email, body.password, 'deliverer']
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


  //#########################################

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
    text: 'UPDATE projects_det SET record_status = \'pending_event\', status = \'PROMOTED\', listinghash = $2, promoter_publickey = $3 WHERE project_Id = $1 RETURNING *',
    values: [body.projectId, body.listingHash, body.promoterPublicKey]
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
    text: 'UPDATE projects_det SET record_status = \'confirmed\' where listinghash = $1 RETURNING *',
    values: [body.listingHash]
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
    text: 'UPDATE projects_det SET record_status = \'\', status = \'APPLIED\', listinghash = \'\', promoter_publickey = \'\' WHERE project_id = $1 RETURNING *',
    values: [body.projectId]
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

  //#########################################

  async getChallenge(body) {

    console.log("inside getChallenge : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'getChallenge',
    text: 'SELECT * from CHALLENGES where project_id = $1',
    values: [body.projectId]
  }

    try {
      console.log("inside client.connect getChallenge try");
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
    values: [body.projectId, body.submissionDate, body.listingHash, body.challengerPublicKey, 'pending_event']
  }

    try {
      console.log("inside client.connect challenge try");
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
    text: 'UPDATE PROJECTS_DET set status = \'CHALLENGED\', record_status = \'pending_event\' where listinghash = $1 RETURNING *',
    values: [body.listingHash]
  }

    try {
      console.log("inside client.connect projectChallenge try");
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

  async revertChallenge(body) {

    console.log("inside revertChallenge : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'revertChallenge',
    text: 'DELETE FROM CHALLENGES where (project_id = $1 and listingHash = $2 and submission_date = $3) RETURNING *',
    values: [body.projectId, body.listingHash, body.submissionDate]
  }

    try {
      console.log("inside client.connect revertChallenge try");
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

  async revertProjectChallenge(body) {

    console.log("inside revertProjectChallenge : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'challenge',
    text: 'UPDATE PROJECTS_DET set status = \'IN CHALLENGE PERIOD\', record_status = \'confirmed\' where project_id = $1 RETURNING *',
    values: [body.projectId]
  }

    try {
      console.log("inside client.connect revertProjectChallenge try");
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



  async confirmChallenge(body) {

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
    text: 'UPDATE CHALLENGES set  challengeid = $2, data = $3, commitEndDate = $4, revealEndDate = $5, challenger = $6, record_status = $7 where listinghash = $1 and record_status not in(\'confirmed\', \'CHALLENGE_SUCCESS\', \'CHALLENGE_FAILED\') RETURNING *',
    values: [body.listingHash, body.challengeId, body.data, body.commitEndDate,  body.revealEndDate,  body.challenger, 'confirmed']
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

  async confirmProjectChallenge(body) {

    console.log("inside confirmProjectChallenge : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'confirmProjectChallenge',
    text: 'UPDATE  PROJECTS_DET set record_status = $2, maxChallenge_id = $3 WHERE listinghash = $1 RETURNING *',
    values: [body.listingHash, 'confirmed', body.challengeId]
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

  async getMaxChallengeId() {

    console.log("inside getMaxChallengeId ");

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'getMaxChallengeId',
    text: 'SELECT max(challengeId) from challenges',
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

  async challengeConclusion(body) {

    console.log("inside challengeConclusion : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'challengeConclusion',
    text: 'UPDATE CHALLENGES set rewardpool = $2, totaltokens = $3, record_status = $4 where challengeid = $1  RETURNING *',
    values: [body.challengeId, body.rewardPool, body.totalTokens,  body.challengeOutcome]
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

  async challengeProjectConclusionSuccess(body) {

    console.log("inside challengeProjectConclusionSuccess : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

 // body.status='ACCEPTED',
   //   body.rejection_date='',
     // body.record_status=''

  const query = {
    name: 'challengeEventConfirm',
    text: 'UPDATE  PROJECTS_DET set status = $2, record_status = $3 WHERE listinghash = $1 RETURNING *',
    values: [body.listingHash, 'PASSED_CHALLENGE', 'final']
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

  async challengeProjectConclusionFailed(body) {

    console.log("inside challengeProjectConclusionFailed : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

 // body.status='ACCEPTED',
   //   body.rejection_date='',
     // body.record_status=''

  const query = {
    name: 'challengeEventConfirm',
    text: 'UPDATE  PROJECTS_DET set status = $2, rejection_date = $3, record_status = $4 WHERE listinghash = $1 RETURNING *',
    values: [body.listingHash, 'FAILED_CHALLENGE', body.rejection_date, 'final']
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

  //#########################################

  async getVotes(body) {

    console.log("inside getVotes : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'getVotes',
    text: 'select * from votes where project_id = $1 and poll_id = $2',
    values: [body.projectId, body.challengeId]
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
    text: 'INSERT INTO VOTES (poll_id, secret_hash, salt, project_id, user_id, voter_publickey, record_status, status) VALUES($1,$2,$3,$4, $5, $6, $7, $8) RETURNING *',
    values: [body.pollId, body.secretHash, body.salt, body.projectId,  body.userId,  body.voterPublicKey, 'pending_event', 'COMMITED']
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

  async revertCommitVote(body) {

    console.log("inside revertCommitVote : "+body);

  const client = new Client({
      host     : this.PG_HOST,
      database     : this.PG_DATABASE,
      user : this.PG_USER,
      password : this.PG_PASSWORD,
      port     : this.PG_PORT
    })

  const query = {
    name: 'revertCommitVote',
    text: 'DELETE from VOTES where (poll_id = $1 and project_id = $2 and user_id = $3) RETURNING *',
    values: [body.pollId, body.projectId, body.userId]
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

  async confirmCommitVote(body) {

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
    text: 'UPDATE VOTES SET record_status = \'confirmed\' WHERE (poll_id = $1 and voter_publickey = $2) RETURNING *',
    values: [body.pollId, body.voterPublicKey]
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

  async revealVote(body) {

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
    text: 'UPDATE VOTES SET record_status = \'pending_event\' and status = \'REVEALED\' WHERE (poll_id = $2 and user_id = $1) RETURNING *',
    values: [body.userId, body.pollId, body.voteOption]
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

  async confirmRevealVote(body) {

    console.log("inside confirmRevealVote : ");

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
    name: 'confirmRevealVote',
    text: 'UPDATE VOTES SET record_status = \'final\' WHERE (poll_id = $2 and voter_publickey = $1) RETURNING *',
    values: [body.voterPublicKey, body.pollId]
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

  //#########################################


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


}

module.exports = DatabaseMgr;