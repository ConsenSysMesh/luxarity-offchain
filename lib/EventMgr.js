const registry_artifact = require('../../build/contracts/Voting.json')

class EventMgr {

 constructor() {
    //this.pgUrl = null;
    this.PG_HOST = null;
    this.PG_DATABASE = null;
    this.PG_USER = null;
    this.PG_PASSWORD = null;
    this.PG_PORT = null;


    this.seed = null;

    this.web3s = {};

    this.gasPrices = {};
    console.log("EventMgr Constructor");

    for (const network in networks) {
      let provider = new Web3.providers.HttpProvider(networks[network].rpcUrl);
      let web3 = new Web3(provider);
      web3.eth = Promise.promisifyAll(web3.eth);
      this.web3s[network] = web3;

      this.gasPrices[network] = DEFAULT_GAS_PRICE;

    }
  }


  async startEventWatch(){

  		let registryAddress = "0x6dbd66c23f636c39380b2ff40ac59569d6a6d63e";
		var Registry = contract(registry_artifact);

  		const contractInstance = Registry.at(registryAddress);

  		contractInstance._Application().watch((err, res) => {
        if (err) {
          console.log("watch events error: " + err);
        } else {
          	console.log("watch events success");
          };
        }
      })

  }




}