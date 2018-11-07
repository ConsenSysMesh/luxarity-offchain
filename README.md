# Serverless Build for TEST Luxarity Offchain crud

Excepts test SQS triggers from Lux-Continous.

Lux-Continous is a program that is deployed on aws elastic beanstalk
that reads data from shopify and pushes to an SQS queue

SLS environment: tst
SQS endpoints: us-east-1 arn:aws:sqs:us-east-1:711302153787:lux-ebs-test
Lux-Continous: https://github.com/ConsenSys/lux-continous.git
Database : luxarity.cijmyc3a39cj.us-east-1.rds.amazonaws.com
Table: tst_orders