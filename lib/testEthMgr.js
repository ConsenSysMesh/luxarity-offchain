Web3 = require('web3')
const fs = require('fs');
const SolidityFunction = require('web3/lib/web3/function');
const _ = require('lodash');
Transaction = require('ethereumjs-tx');
signers = require('eth-signer').signers;
generators = require('eth-signer').generators;

ABIJ = require('../build/contracts/EIP20.json');

class EthereumMgr {

  constructor(){
  	//this.seed = null;
  	//this.infuraAddr = null;
  	this.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/Vk9GN4X6SXCy4BqnuEHq "));
  	

    console.log("EthereumMgr constructor");
  };

  async makeTx() {

  		console.log("inside makeTx");
  		//web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/Vk9GN4X6SXCy4BqnuEHq "));
  		
  		//get Token Contract
  		//const token = JSON.parse(fs.readFileSync('../build/contracts/EIP20.json', 'utf8'));
  		let token = JSON.parse(JSON.stringify(ABIJ));
    	console.log(ABIJ);

  		const tokenAbi = token.abi;
		console.log("tokenAbi: "+tokenAbi);
		const tokenAddr='0x6be6b25095d7c20c8c72cc11c12380060266670a';
		var tokenContract = this.web3.eth.contract(tokenAbi);
		var tokenContractInstance = tokenContract.at(tokenAddr);
		console.log("Token name: "+tokenContractInstance.name());
		console.log("##################################");

		//create tokenPayload 
		let approveFunctionDef = new SolidityFunction('', _.find(tokenAbi, { 'name' : 'approve' }), '');
		console.log("approveFunctionDef: "+approveFunctionDef);

		var registryAddr = '0x91e6693af3dd8d2108fc4c6cd3a1e88b75c49081';
		var approveVal = 1000;

		var tokenPayload = approveFunctionDef.toPayload([registryAddr, approveVal]).data;
		console.log("tokenPayload: "+tokenPayload);

		//get gas price
		var gp = this.web3.eth.gasPrice;
		var gpnum = gp.toNumber();
		console.log("gp: "+gp);
		console.log("gp string: "+gp.toString(10));

		//build rawTx
		let rawTx = {
	      from: '0xD176f6907Ae1E699b39F78cf4582B019518E2B80',
	      to: tokenAddr,
	      nonce: this.web3.eth.getTransactionCount('0xD176f6907Ae1E699b39F78cf4582B019518E2B80'),
	      gasPrice: gpnum,
	      value: '0x00',
	      data: tokenPayload,
    	};

    	//create tx
    	const tx = new Transaction(rawTx)
		console.log('tx: '+tx);
		console.log("tx.to: "+tx.to.toString('hex'));

		//sign tx
		var privKey = new Buffer('846f07185a3b1467465b2895ccf091c3b54cc283ae6c06c53bb03a9661bf6bea', 'hex');

	    try{
	 		tx.sign(privKey);
	 		console.log('tx sign worked?');
	    } catch (err) {console.log("txisng err: "+err)}

	    //estimateGas and set tx.gaslimit
	    const estimatedGas =  await this.getEstimateGas(tx);
	    tx.gasLimit = estimatedGas + 1000;

	    //signTx and serialize
	    tx.sign(privKey);
  		var serializedTx = tx.serialize();

  		//sendTx

  		this.web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
		  if (!err)
		  	
		    console.log(hash); // 0xd3e998245802866a61e7be9ac4cc28980b308bfc4c38250c495647c3de2fd54f
		    return hash;
		});

  }

  async getEstimateGas(tx) {
    if (!tx) throw "no tx object";

    	console.log("##################################");
    	console.log("nonce: "+tx.nonce);
    	console.log("noncehex: "+tx.nonce.toString("hex"));
    	console.log("gaspricehex: "+tx.gasPrice);
    	console.log("gasprice: "+tx.gasPrice.toString("hex"));
    	console.log("to: "+tx.to);
    	console.log("tohex: "+tx.to.toString("hex"));
    	console.log("value: "+tx.value);
    	console.log("valuehex: "+tx.value.toString("hex"));
    	console.log("data: "+tx.data);
    	console.log("datahex: "+tx.data.toString("hex"));
    	console.log("from: "+tx.from);
    	console.log("fromhex: "+tx.from.toString("hex"));
    	console.log("##################################");


    //let tx = new Transaction(Buffer.from(txHex, 'hex'))
    let txCopy = {
      nonce: "0x" + tx.nonce.toString("hex"),
      gasPrice: "0x"+tx.gasPrice.toString("hex"),
      to: "0x"+tx.to.toString("hex"),
      value: '0x00',
      data: "0x"+tx.data.toString("hex"),
      from: '0xD176f6907Ae1E699b39F78cf4582B019518E2B80'
    };

    	console.log("##################################");
    	console.log("nonce: "+txCopy.nonce);
    	console.log("noncehex: "+txCopy.nonce.toString("hex"));
    	console.log("gaspricehex: "+txCopy.gasPrice);
    	console.log("gasprice: "+txCopy.gasPrice.toString("hex"));
    	console.log("to: "+txCopy.to);
    	console.log("tohex: "+txCopy.to.toString("hex"));
    	console.log("value: "+txCopy.value);
    	console.log("valuehex: "+txCopy.value.toString("hex"));
    	console.log("data: "+txCopy.data);
    	console.log("datahex: "+txCopy.data.toString("hex"));
    	console.log("from: "+txCopy.from);
    	console.log("fromhex: "+txCopy.from.toString("hex"));
    	console.log("##################################");

    let price = 3000000;
    try {
       price = this.web3.eth.estimateGas(txCopy);
       console.log("set gas price to: "+price);
    } catch (error) {console.log('inside estimateGas error: '+error)}
    return price;
  };


}

module.exports = EthereumMgr;