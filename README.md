# SLS - AWS-RDS-PG-DB - nodejs8.10


AWS Key - AKIAJ2YSHPRHNQ3PUT6Q <br/>
AWS Key - AKIAIO6RSWHCNJGEHGGQ <br/>

**in serverless.yml:** <br/>
* Must have region set to us-west-1 if database instance is in us-west-1 <br/>
* Must use nodejs810  <br/>
* AWS.KMS().decrypt(buffer(process.env.SECRETS) only works inside lambda function.  cannot simply run node.js file with node <br/>

debugging: <br/>
```
sls logs --function helloWorld
```