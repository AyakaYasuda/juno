import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import AuthServices from '@libs/services/auth.services';

const authorizerFunc = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  const token = event.authorizationToken;
  const methodArn = event.methodArn;
  console.log('token', token);

  const authServices = new AuthServices();

  const verification: { verified: boolean; message: 'string' } =
    await authServices.verifyToken(token);
  console.log('verification', verification);

  switch (verification.verified) {
    case true:
      return generateAuthResponse('user', 'Allow', methodArn);
    case false:
      return generateAuthResponse('user', 'Deny', methodArn);
    default:
      return;
  }
};

const generateAuthResponse = (
  principalId: string,
  effect: string,
  methodArn: string
) => {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
    principalId,
    policyDocument,
  };
};

const generatePolicyDocument = (effect: string, methodArn: string) => {
  if (!effect || !methodArn) return null;

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: methodArn,
      },
    ],
  };

  return policyDocument;
};

export const main = middyfy(authorizerFunc);
