import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';


export class LambdaLayerStackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LambdaLayerStackQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // Create an S3 bucket to store the Lambda Layer
    const bucket = new s3.Bucket(this, 'LayerBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY, // To Remove all the policies from the S3 Bucket
      versioned: true,
   });

    // Create the Lambda Layer and add it to the bucket
    const layer = new lambda.LayerVersion(this, 'MyLayer', {
      code: lambda.Code.fromAsset('lambdalayer'), // Adjust the path 'layer/lambdalayer' and in lambda layer nodejs folder resides.
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X], // Specify your runtime
    });


    new s3deploy.BucketDeployment(this, "DeployLayer", {
      sources: [s3deploy.Source.asset("./lambdalayer")],
      destinationBucket: bucket,
    });


    // layer.addPermission('LayerPermission', {
    //   permission: 'lambda.amazonaws.com',

    // });

    // layer.grantRead(new lambda.ServicePrincipal('lambda.amazonaws.com'));
    // layer.publish();

      // Output the S3 bucket name and Lambda Layer ARN
    new cdk.CfnOutput(this, 'LayerBucketName', {
      value: bucket.bucketName,
      exportName: 'lambdalayerstackstack-layerbucketf5b16ca1-1o5ztngm5m6zl',
    });

    new cdk.CfnOutput(this, 'LayerArn', {
      value: layer.layerVersionArn,
      exportName: 'arn:aws:lambda:us-west-1:911519397586:layer:MyLayer38944FA5:1',
    });
  }
}
