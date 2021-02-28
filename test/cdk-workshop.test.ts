import { expect as expectCDK, haveResource, matchTemplate, MatchStyle, PropertyMatcher, objectLike, match } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkWorkshop from '../lib/cdk-workshop-stack';

test('Lambda Function Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack: cdk.Stack = new CdkWorkshop.CdkWorkshopStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource('AWS::Lambda::Function', {
    Handler: 'hello.handler',
    Runtime: 'nodejs14.x'
  }));

  //stack.getResource()  how do?
});

test('API Gateway V2 Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.CdkWorkshopStack(app, 'MyTestStack');

  // THEN
  expectCDK(stack).to(haveResource('AWS::ApiGateway::RestApi'));
  expectCDK(stack).to(haveResource('AWS::ApiGateway::Method', {
    Integration: objectLike({
      IntegrationHttpMethod: 'POST',
      Uri: objectLike({
        'Fn::Join': expect.arrayContaining([expect.stringContaining('arn')])
      })
    })
  }));

  // expectCDK(stack).to(matchTemplate({
  //   "Resources": {}
  // }, MatchStyle.EXACT))
});
