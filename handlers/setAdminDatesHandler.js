

class setAdminDatesHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside setAdminDatesHandler.handle");

  let body;

    if (event && !event.body) {
      body = event;
    } else if (event && event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        cb({ code: 400, message: "no json body" });
        return;
      }
    } else {
      cb({ code: 400, message: "no json body" });
      return;
    }

   
    body.submissionDate = new Date().toISOString();

    if(body.challengeStartDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_startDate) VALUES ($1, $2) Returning *'
      body.values = [body.submissionDate, body.challengeStartDate]
    }

    if(body.challengeStartDate && body.commitStartDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_startDate, commit_startDate) VALUES ($1, $2, $3) Returning *'
      body.values = [body.submissionDate, body.commitStartDate]
    }

    if(body.challengeStartDate && body.revealStartDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_startDate, reveal_startDate) VALUES ($1, $2, $3) Returning *'
      body.values = [body.submissionDate, body.revealStartDate]
    }

    if(body.challengeStartDate && body.commitStartDate && body.revealStartDate){
       body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_startDate, challenge_startDate, reveal_startDate) VALUES ($1, $2, $3, $4) Returning *'   
      body.values = [body.submissionDate, body.challengeStartDate, body.commitStartDate, body.revealStartDate]
    }

    if(body.commitStartDate && body.revealStartDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, commit_startDate, reveal_startDate) VALUES ($1, $2, $3) Returning *'
      body.values = [body.submissionDate, body.commitStartDate, body.revealStartDate]
    }

    if(body.commitStartDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, commit_startDate) VALUES ($1, $2) Returning *'
      body.values = [body.submissionDate, body.commitStartDate]
    }

    if(body.revealStartDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, reveal_startDate) VALUES ($1, $2) Returning *'
      body.values = [body.submissionDate, body.revealStartDate]
    }

     if(body.challengeStartDate && body.challengeEndDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_startDate, challenge_endDate) VALUES ($1, $2, $3) Returning *'
      body.values = [body.submissionDate, body.challengeStartDate, body.challengeEndDate]
    }

    if(body.challengeStartDate && body.challengeEndDate && body.commitStartDate ){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_startDate, challenge_endDate, commit_startDate) VALUES ($1, $2, $3, $4) Returning *'
      body.values = [body.submissionDate, body.challengeStartDate, body.challengeEndDate, body.commitStartDate]
    }

    if(body.challengeStartDate && body.challengeEndDate && body.revealStartDate ){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_startDate, challenge_endDate, reveal_startDate) VALUES ($1, $2, $3) Returning *'
      body.values = [body.submissionDate, body.challengeStartDate, body.challengeEndDate, body.revealStartDate]
    }

    if(body.challengeStartDate && body.challengeEndDate && body.commitStartDate && body.revealStartDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_startDate, challenge_endDate, commit_startDate, reveal_startDate) VALUES ($1, $2, $3, $4, $5) Returning *'
      body.values = [body.submissionDate, body.challengeStartDate, body.challengeEndDate, body.commitStartDate, body.revealStartDate]
    }

    //
    if(body.challengeEndDate && body.commitStartDate ){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_endDate, commit_startDate) VALUES ($1, $2, $3) Returning *'
      body.values = [body.submissionDate, body.challengeEndDate, body.commitStartDate]
    }

    if(body.challengeEndDate && body.revealStartDate ){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_endDate, reveal_startDate) VALUES ($1, $2, $3) Returning *'
      body.values = [body.submissionDate, body.challengeEndDate, body.revealStartDate]
    }

    if(body.challengeEndDate && body.commitStartDate && body.revealStartDate){
      body.sql = 'INSERT INTO adminSetDates (submission_date, challenge_endDate, commit_startDate, reveal_startDate) VALUES ($1, $2, $3, $4) Returning *'
      body.values = [body.submissionDate, body.challengeEndDate, body.commitStartDate, body.revealStartDate]
    }

    console.log(body.values[0])
  
    try{

      console.log("inside try");
      const records = await this.databaseMgr.setAdminDates(body);
      console.log("after records await");
      if(!records) {
        throw new Error('userId not found')
      }
      else {
        cb(null, records);
        return;
      }

    }catch(error){
      console.log("setAdminDatesHandler error"+error);
      cb({ code: 500, message: "setAdminDatesHandler: " + error.message });
      return;
    }

  }



};

module.exports = setAdminDatesHandler;