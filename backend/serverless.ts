import type { AWS } from '@serverless/typescript';

import getUserById from '@functions/getUserById';
import createUser from '@functions/createUser';
import getEventByUserId from '@functions/getEventByUserId';
import createEvent from '@functions/createEvent';
import loginUser from '@functions/loginUser';

import dynamoConfigs from './severless/resources';
import iam from './severless/iam';

const serverlessConfiguration: AWS = {
  service: 'juno',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    apiName: 'juno',
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    profile: 'juno',
    stage: 'prod',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    logRetentionInDays: 14,
    iamRoleStatements: iam,
  },
  // import the function via paths
  functions: {
    getUserById,
    createUser,
    getEventByUserId,
    createEvent,
    loginUser,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ...dynamoConfigs,
    },
  },
};

module.exports = serverlessConfiguration;
