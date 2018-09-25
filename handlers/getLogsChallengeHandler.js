

class getLogsChallengeHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside getLogsChallengeHandler.handle");

  let body = event.Records[0].body;
  try {
        body = JSON.parse(body);
      } catch (e) {
        cb({ code: 500, message: "no json body" });
        return;
      }

   
    if (!body.listingHash) {
      cb({ code: 500, message: "report parameter missing - listingHash" });
      return;
    }

    if (!body.challengeId) {
      cb({ code: 500, message: "report parameter missing - challengeId" });
      return;
    }

    

    try{
      //[body.listingHash, body.challengeId, body.data, 
      //body.commitEndDate,  body.revealEndDate,  body.challenger,
      const logrecords = await this.getSimpleLogs(body);
      console.log("logrecords: "+logrecords)
      //console.log("res: "+logrecords[0].logData.commitEndDate.toString())
      //var commitEndDate = new Date(logrecords[0].logData.commitEndDate.toString() * 1000).toISOString().replace(/T.+/,'');
      //console.log("commitEndDate: "+commitEndDate)
      body.challengeId = logrecords[0].logData.challengeID.toString();
      body.data = logrecords[0].logData.data.toString();
      body.commitEndDate = new Date(logrecords[0].logData.commitEndDate.toString() * 1000);
      body.revealEndDate = new Date(logrecords[0].logData.revealEndDate.toString() * 1000);
      body.challenger = logrecords[0].logData.challenger.toString();
      //cb(null, logrecords);
      //return;
    }catch(error){
      console.log("getLogsChallengeHandler error: "+error);
      cb({ code: 500, message: "getLogsChallengeHandler: " + error.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.confirmChallenge(body);
      console.log("after records await");
      //cb(null, records);
      //return;

    }catch(error){
      console.log("getLogsChallengeHandler.confirmChallenge DB  error"+error);
      cb({ code: 500, message: "getLogsChallengeHandler.confirmChallenge DB error: " + error.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.confirmProjectChallenge(body);
      console.log("after records await");
      cb(null, records);
      return;

    }catch(error){
      console.log("getLogsChallengeHandler.confirmProjectChallenge DB  error"+error);
      cb({ code: 500, message: "getLogsChallengeHandler.confirmProjectChallenge DB error: " + error.message });
      return;
    }



  }

  async getSimpleLogs(body){
      console.log("in getsimpleLogs")
      try{
      const res = await this.simpleLogs(body)
      console.log("res: "+res)
      return res;
    }catch(error){
      //return "simpleLogs() error: "+error
      throw error
    }
    }

    async simpleLogs(body){

      const Ethjs = require('ethjs')
      const EthEvents = require('eth-events')
      const Token = require('../build/contracts/Registry.json')
      const map = require('lodash/fp/map')

      const HttpProvider = require('ethjs-provider-http');
      const Eth = require('ethjs-query');
      const eth = new Eth(new HttpProvider('https://rinkeby.infura.io'));

    
      const contract = {
        abi: Token.abi,
        address: '0x671e06151568a92047f0cec61487b2894211b569',
      }

    
      const ethEvents = new EthEvents(eth, contract)
    

      // block range
      const fromBlock = '2854366'
      const toBlock = 'latest'

      // event name(s)
      //const eventNames = ['_PollCreated']
      const eventNames = ['_Challenge']

      // indexed event emission arg values (un-hashed filter topics)
      const indexedFilterValues = {
        listingHash: body.listingHash,
        challengeID: body.challengeId
        //listingHash: '0x2d47c9dcff2e972b00379ff506c22bf4ca293e9bf8850348781707f267825f2b'
        //bad listingHash:'0x2d47c9dcff2e972b00379ff506c22bf4ca293e9bf8850348781707f267825f6h'
        //good listingHash:'0x2d47c9dcff2e972b00379ff506c22bf4ca293e9bf8850348781707f267825f2b'
        //_to: '0xCAFEDEADBEEF12345678912456789',
      }

      let logs;
      let logresult;
      try{
        console.log("inside getLogs try")
      logs = await ethEvents.getLogs(fromBlock, toBlock, eventNames, indexedFilterValues);
      if(!logs || logs==null || logs.length == 0 || logs===undefined){
          console.log("no logs");
          throw new Error("no logs")
        }
      }catch(error){
        console.log("getLogs error: "+error)
        //return "getLogsError"
        throw error
      }

      console.log("logs: "+logs)

          try{
            console.log("in logs.map try");
            const output = await logs.map( log =>{
                      console.log("in logs.map");
                      console.log(log)
                      //return log.logData.applicant.toString();
                      return log;
                    })
            //console.log("logresult: "+logresult)
            return output;
          }catch(error){
            console.log("logs.map error");
            //return "logs.map error"
            throw error
            }

      }




};

module.exports = getLogsChallengeHandler;