# Backend Serverless Build for WWF
For supporting WWF's ImpactFolio TCR deployment. <br/>
Serverless provides lambda function endpoints for interacting with postgres database. <br/>
Lambda-Sensui's relay function is also available for sending signed meta transactions. <br/>
 
[WWF Technical Architecture Doc](https://docs.google.com/presentation/d/1c0_-6NLb3zSFwZoRipR61ZYAWnpHLSEbhy_f66GJLYk/edit#slide=id.g3e0cd18cee_0_402) <br/>
[WWF TCR Parameters Doc](https://docs.google.com/presentation/d/1UT11ReifnIXT-PaXYplvHWXDeT8_dB4ECmEHJvmY7Fo/edit#slide=id.g3caa06f710_0_1136) <br/>
[Social Impact TCR Deployment Repo](https://github.com/ConsenSys/SI_TCR)<br/>
[Social Impact WWF Front End:](https://github.com/ConsenSys/WWF-TCR-UI)<br/>

### README guide: <br/>
SETUP<br/>
- Debugging Suggestions<br/>
DEPLOY<br/>
TEST ENDPOINTS<br/>
README INFO<br/>
- Repo Guide<br/>
- AWS Details for Social Impact<br/>
- Infura Details<br/>
- Notes<br/>
- Links<br/>

## SETUP
$ npm install <br/>
$ sls config credentials --provder aws --key AKIAJ2YSHPRHNQ3PUT6Q --secret SECRETKEY <br/>
$ sls encrypt -n SECRETS:PG_HOST -v 'hosturl' -k arnkey -s develop <br/>
$ sls encrypt -n SECRETS:PG_DATABASE -v 'dbname' -k arnkey -s develop <br/>
$ sls encrypt -n SECRETS:PG_USER -v 'user' -k arnkey -s develop <br/>
$ sls encrypt -n SECRETS:PG_PASSWORD -v 'password' -k arnkey -s develop <br/>
$ sls encrypt -n SECRETS:PG_PORT -v 'port' -k arnkey -s develop<br/>
$ sls encrypt -n SECRETS:SEED -v 'port' -k arnkey -s develop<br/>

## Debugging Suggestions
*serverless debug function*<br.>
```
sls logs --function functionName
```
*if no build/contracts directory:* <br/>
```
$ truffle compile <br/>
```
*if no installed_contracts directory or you are missing EIP20.json:* <br/>
```
$ truffle install <br/>
```
*if nonce too low error when calling relay* <br/>
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
*projects_det table primary key : project_id & users table  primary key : user_id*


## DEPLOY

$ sls deploy

## Test Endpoints
```
$ sls invoke local -f projectDet -d '{"projectId" : "1"}'
$ sls invoke local -f allProjectDet
```

## README INFO

### Repo Guide
**primary application:**<br/>
handler.js <br/>
handlers *- current structure is one handler.js file per endpoint* <br/>
lib <br/>

**fyi reference:**<br/>
apiCalls.txt *- examples api calls*<br/>
sql.txt *- SQL tables*<br/>

**serverless related:**<br/>
serverless.yml *- sls config and more importantly endpoints*<br/>
kms-secrets.develop.us-west-1.yml *- auto-generated when running sls-kms-secrets*<br/>

**tcr related:**<br/>
conf/config.json *- parameters for tcr deployment*<br/>


**truffle related:**<br/>
ethpm.js<br/>
installed_contracts/<br/>
build/contracts/<br/>
migrations/<br/>
truffle.js<br/>

### AWS Details for Social Impact

**Account:** b4siga<br/>
**Pw:** short social impact password<br/>
https://aws.amazon.com/console/<br/>

**Serverless User:** testServerless <br/>
**AWS access key id:** AKIAJ2YSHPRHNQ3PUT6Q <br/>
https://console.aws.amazon.com/iam/home?region=us-west-1#/users<br/>
https://console.aws.amazon.com/iam/home?region=us-west-1#/users/testServerless?section=security_credentials<br/>

**Region:** us-west-1<br/>
**ARN:** <br/>
**Alias:** kms-serverless<br/>
**administrator:** testServerless<br/>
https://console.aws.amazon.com/iam/home?region=us-west-1#/encryptionKeys/us-west-1<br/>

**PG_HOST:** 
**PG_DATABASE:** postgres
**PG_USER:** 
**PG_PORT:**
Get Database Details not listed here:<br/>
https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#dbinstance:id=testpostgresdb<br/>

### Infura Details
**public key:** 0xD176f6907Ae1E699b39F78cf4582B019518E2B80<br/>
**infura address:** Vk9GN4X6SXCy4BqnuEHq <br/>
**seed:** <br/>
**private key:**<br/>

## NOTES
**in serverless.yml:** <br/>
* Must have region set to us-west-1 if database instance is in us-west-1 <br/>
* Must use nodejs810  <br/>
**other:**<br/>
* AWS.KMS().decrypt(buffer(process.env.SECRETS) only works inside lambda function.  cannot simply run node.js file with node <br/>
* make sure sls encrypt -n doesn't get tripped up when copying and pasting values.  DOUBLE CHECK '' <br/>

### Links
[TCR:](https://github.com/skmgoldin/tcr)<br/>
[TCR-UI events doc:](https://github.com/kangarang/tcr-ui/blob/master/docs/Events.md)<br/>
[TCR-UI tx doc:](https://github.com/kangarang/tcr-ui/blob/master/docs/Events.md)<br/>

Other Useful Links:<br/>
https://consensys.invisionapp.com/share/ZBM4PCYSVFW#/screens/305195774<br/>
https://github.com/ConsenSys/WWF-Simple/blob/master/app/scripts/index.js<br/>
https://github.com/ConsenSys/hala-contracts/blob/watch-events/testEvents.js<br/>
https://github.com/ConsenSys/wwf-db<br/>
https://github.com/ConsenSys/lambda-sensui/tree/simple<br/>


