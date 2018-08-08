# SLS - AWS-RDS-PG-DB - nodejs8.10


AWS Key - AKIAJ2YSHPRHNQ3PUT6Q <br/>

Serverless User - testServerless <br/>
AWS access key id - AKIAJ2YSHPRHNQ3PUT6Q <br/>

Region: us-west-1<br/>
ARN: <br/>
Alias: kms-serverless<br/>
administrator: testServerless<br/>

apiCalls.txt for examples calls<br/>

## SETUP
$ npm install <br/>
$ sls config credentials --provder aws --key AKIAJ2YSHPRHNQ3PUT6Q --secret SECRETKEY <br/>
$ sls encrypt -n SECRETS:PG_HOST -v 'hosturl' -k arnkey -s develop <br/>
$ sls encrypt -n SECRETS:PG_DATABASE -v 'dbname' -k arnkey -s develop <br/>
$ sls encrypt -n SECRETS:PG_USER -v 'user' -k arnkey -s develop <br/>
$ sls encrypt -n SECRETS:PG_PASSWORD -v 'password' -k arnkey -s develop <br/>
$ sls encrypt -n SECRETS:PG_PORT -v 'port' -k arnkey -s develop<br/>
$ sls encrypt -n SECRETS:SEED -v 'port' -k arnkey -s develop<br/>

* if no build/contracts directory: <br/>
```
$ truffle compile <br/>
```
* if no installed_contracts directory or you are missing EIP20.json: <br/>
```
$ truffle install <br/>
```
* if nonce too low error when calling relay <br/>
```
//run node cmd in any terminal :
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/INFURA_ADDR "));
console.log("nonce: "+web3.eth.getTransactionCount('address'));
```

```
## then in psequel, set latest nonce value (replace 10 with result from above) :
UPDATE nonces SET nonce = 10 WHERE address = 'addr'
```
* projects_det primary key : project_id
* users primary key : user_id

## DEPLOY

$ sls deploy

## NOTES
**in serverless.yml:** <br/>
* Must have region set to us-west-1 if database instance is in us-west-1 <br/>
* Must use nodejs810  <br/>
* AWS.KMS().decrypt(buffer(process.env.SECRETS) only works inside lambda function.  cannot simply run node.js file with node <br/>
* make sure sls encrypt -n doesn't get tripped up when copying and pasting values.  DOUBLE CHECK '' <br/>

debugging: <br/>
```
sls logs --function helloWorld
```