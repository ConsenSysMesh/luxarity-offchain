

class getLogsRevealVoteHandler{

  constructor(databaseMgr){
    this.databaseMgr = databaseMgr;
  };

 async handle(event, context, cb) {

  console.log("inside getLogsRevealVoteHandler.handle");

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

    if (!body.voterPublicKey) {
      cb({ code: 500, message: "report parameter missing - voter" });
      return;
    }

    if (!body.userId) {
      cb({ code: 500, message: "report parameter missing - userId" });
      return;
    }

    if (!body.pollId) {
      cb({ code: 500, message: "report parameter missing - pollId" });
      return;
    }

    

    try{

      const logrecords = await this.getSimpleLogs(body);
      console.log("logrecords: "+logrecords)
      
      //cb(null, logrecords);
      //return;
    }catch(error){
      console.log("getLogsRevealVoteHandler error: "+error);
      cb({ code: 500, message: "getLogsRevealVoteHandler: " + error.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.confirmRevealVote(body);
      console.log("after records await");
      //cb(null, records);
      //return;

    }catch(error){
      console.log("getLogsRevealVoteHandler DB  error"+error);
      cb({ code: 500, message: "getLogsRevealVoteHandler DB error: " + error.message });
      return;
    }

    try{

      console.log("inside try");
      const records = await this.databaseMgr.projectConfirmRevealVote(body);
      console.log("after records await");
      cb(null, records);
      return;

    }catch(error){
      console.log("getLogsRevealVoteHandler DB  error"+error);
      cb({ code: 500, message: "getLogsRevealVoteHandler DB error: " + error.message });
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
      const Token = require('../build/contracts/PLCRVoting.json')
      const map = require('lodash/fp/map')

      const HttpProvider = require('ethjs-provider-http');
      const Eth = require('ethjs-query');
      const eth = new Eth(new HttpProvider('https://rinkeby.infura.io'));

    
      const contract = {
        abi: Token.abi,
        address: '0x63b98aadfdf3217d4aa2402bc79489f39bd8dcdb',
      }

    
      const ethEvents = new EthEvents(eth, contract)
    

      // block range
      const fromBlock = '2854366'
      const toBlock = 'latest'

      // event name(s)
      //const eventNames = ['_PollCreated']
      const eventNames = ['_VoteRevealed']

      const intPollId = parseInt(body.pollId, 10);
      console.log(intPollId)
      const hexPollId = (intPollId).toString(16)
      console.log(hexPollId)

      // indexed event emission arg values (un-hashed filter topics)
      const indexedFilterValues = {
        voter: body.voterPublicKey,
        pollID: '0x'+hexPollId
        //listingHash: '0x2d47c9dcff2e972b00379ff506c22bf4ca293e9bf8850348781707f267825f2b'
        //bad listingHash:'0x2d47c9dcff2e972b00379ff506c22bf4ca293e9bf8850348781707f267825f6h'
        //good listingHash:'0x2d47c9dcff2e972b00379ff506c22bf4ca293e9bf8850348781707f267825f2b'
        //_to: '0xCAFEDEADBEEF12345678912456789',
      }

      /*console.log("doing first getLogs")
      await ethEvents.getLogs(fromBlock, toBlock, eventNames, indexedFilterValues, true).then(logs => {
        logs.map(log => {
          console.log("first getLogs log should be below")
          console.log(log)
          console.log(log.logData.applicant.toString())

        })
      }).catch( e => {
        console.log("error: " + e);
      })*/

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
                      //console.log(log.logData.applicant.toString())
                      //return log.logData.applicant.toString();
                      return log[0]
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

module.exports = getLogsRevealVoteHandler;