import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';


export class AnotherStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AnotherQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // Import the S3 bucket name and Lambda Layer ARN from the output of the LambdaLayerStack
    const layerBucketName = cdk.Fn.importValue('lambdalayerstackstack-layerbucketf5b16ca1-1o5ztngm5m6zl');
    const layerArn = cdk.Fn.importValue('arn:aws:lambda:us-west-1:911519397586:layer:MyLayer38944FA5:1');


    // Create a Lambda function that uses the imported Lambda Layer
    const myFunction = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'), // Adjust the path of the code
      layers: [lambda.LayerVersion.fromLayerVersionArn(this, 'MyLayerImport', layerArn)],
    });
  }
}
