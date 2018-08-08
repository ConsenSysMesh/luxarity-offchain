# Backend Serverless Build for WWF
For supporting WWF's ImpactFolio TCR deployment. <br/>
Serverless provides lambda function endpoints for interacting with postgres database. <br/>
Lambda-Sensui's relay function is also available for sending signed meta transactions. <br/>
 
[WWF Technical Architecture Doc](https://docs.google.com/presentation/d/1c0_-6NLb3zSFwZoRipR61ZYAWnpHLSEbhy_f66GJLYk/edit#slide=id.g3e0cd18cee_0_402)&nbsp;&nbsp;&nbsp;&nbsp;
[WWF TCR Parameters Doc](https://docs.google.com/presentation/d/1UT11ReifnIXT-PaXYplvHWXDeT8_dB4ECmEHJvmY7Fo/edit#slide=id.g3caa06f710_0_1136) <br/>
[Social Impact TCR Deployment Repo](https://github.com/ConsenSys/SI_TCR)&nbsp;&nbsp;&nbsp;&nbsp;
[Social Impact WWF Front End:](https://github.com/ConsenSys/WWF-TCR-UI)<br/>

### README guide: 
SETUP<br/>
-Debugging Suggestions<br/>

DEPLOY<br/>
-test Endpoints<br/>

README INFO<br/>
-Folder Structure<br/>
-AWS Details for Social Impact<br/>
-Infura Details<br/>
-Notes<br/>
-Links<br/>

## SETUP
```
$ npm install 
$ sls config credentials --provder aws --key AKIAJ2YSHPRHNQ3PUT6Q --secret SECRETKEY 
$ sls encrypt -n SECRETS:PG_HOST -v 'hosturl' -k arnkey -s develop
$ sls encrypt -n SECRETS:PG_DATABASE -v 'dbname' -k arnkey -s develop 
$ sls encrypt -n SECRETS:PG_USER -v 'user' -k arnkey -s develop 
$ sls encrypt -n SECRETS:PG_PASSWORD -v 'password' -k arnkey -s develop 
$ sls encrypt -n SECRETS:PG_PORT -v 'port' -k arnkey -s develop
$ sls encrypt -n SECRETS:SEED -v 'port' -k arnkey -s develop
```

## Debugging Suggestions
*serverless debug function* <br/>
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

### Folder Structure
**primary application:** <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;handler.js <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;handlers *- current structure is one handler.js file per endpoint* <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;lib <br/>

**fyi reference:** <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;apiCalls.txt *- examples api calls* <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;sql.txt *- SQL tables* <br/>

**serverless related:** <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;serverless.yml *- sls config and more importantly endpoints* <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;kms-secrets.develop.us-west-1.yml *- auto-generated when running sls-kms-secrets* <br/>

**tcr related:** <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;conf/config.json *- parameters for TCR deployment* <br/>


**truffle related:** <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;ethpm.js <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;installed_contracts/ <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;build/contracts/ <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;migrations/ <br/>
	&nbsp;&nbsp;&nbsp;&nbsp;truffle.js <br/>

### AWS Details for Social Impact

&nbsp;&nbsp;&nbsp;&nbsp;**Account:** b4siga
&nbsp;&nbsp;&nbsp;&nbsp;**Pw:** short social impact password<br/>
&nbsp;&nbsp;&nbsp;&nbsp;https://aws.amazon.com/console/<br/>

&nbsp;&nbsp;&nbsp;&nbsp;**Serverless User:** testServerless 
&nbsp;&nbsp;&nbsp;&nbsp;**AWS access key id:** AKIAJ2YSHPRHNQ3PUT6Q <br/>
&nbsp;&nbsp;&nbsp;&nbsp;https://console.aws.amazon.com/iam/home?region=us-west-1#/users<br/>
&nbsp;&nbsp;&nbsp;&nbsp;https://console.aws.amazon.com/iam/home?region=us-west-1#/users/testServerless?section=security_credentials<br/>

&nbsp;&nbsp;&nbsp;&nbsp;**Region:** us-west-1
&nbsp;&nbsp;&nbsp;&nbsp;**ARN:** <br/>
&nbsp;&nbsp;&nbsp;&nbsp;**Alias:** kms-serverless
&nbsp;&nbsp;&nbsp;&nbsp;**administrator:** testServerless<br/>
&nbsp;&nbsp;&nbsp;&nbsp;https://console.aws.amazon.com/iam/home?region=us-west-1#/encryptionKeys/us-west-1<br/>

&nbsp;&nbsp;&nbsp;&nbsp;**PG_HOST:** 
&nbsp;&nbsp;&nbsp;&nbsp;**PG_DATABASE:** postgres
&nbsp;&nbsp;&nbsp;&nbsp;**PG_USER:** 
&nbsp;&nbsp;&nbsp;&nbsp;**PG_PASSWORD:** 
&nbsp;&nbsp;&nbsp;&nbsp;**PG_PORT:**<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Get Database Details not listed here:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;https://us-west-1.console.aws.amazon.com/rds/home?region=us-west-1#dbinstance:id=testpostgresdb<br/>

### Infura Details
&nbsp;&nbsp;&nbsp;&nbsp;**public key:** 0xD176f6907Ae1E699b39F78cf4582B019518E2B80<br/>
&nbsp;&nbsp;&nbsp;&nbsp;**infura address:** Vk9GN4X6SXCy4BqnuEHq <br/>
&nbsp;&nbsp;&nbsp;&nbsp;**seed:** <br/>
&nbsp;&nbsp;&nbsp;&nbsp;**private key:**<br/>

## NOTES
**in serverless.yml:** <br/>
* Must have region set to us-west-1 if database instance is in us-west-1 <br/>
* Must use nodejs810  <br/>
**other:**<br/>
* AWS.KMS().decrypt(buffer(process.env.SECRETS) only works inside lambda function.  cannot simply run node.js file with node <br/>
* make sure sls encrypt -n doesn't get tripped up when copying and pasting values.  DOUBLE CHECK '' <br/>

### Links
[TCR](https://github.com/skmgoldin/tcr)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[TCR-UI events doc](https://github.com/kangarang/tcr-ui/blob/master/docs/Events.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[TCR-UI tx doc](https://github.com/kangarang/tcr-ui/blob/master/docs/Events.md)

Other Useful Links:<br/>
https://consensys.invisionapp.com/share/ZBM4PCYSVFW#/screens/305195774<br/>
https://github.com/ConsenSys/WWF-Simple/blob/master/app/scripts/index.js<br/>
https://github.com/ConsenSys/hala-contracts/blob/watch-events/testEvents.js<br/>
https://github.com/ConsenSys/wwf-db<br/>
https://github.com/ConsenSys/lambda-sensui/tree/simple<br/>


