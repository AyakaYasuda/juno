import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import jwt from 'jsonwebtoken';

const AWS = require('aws-sdk');

const verifyToken = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const reqBody = JSON.parse(event.body);

    const token = reqBody.token;

    if (!token) {
      throw new HttpError(400, 'Invalid request');
    }

    const verification = verify(token);
    if (!verification.verified) {
      return formatJSONResponse(401, verification);
    }

    return formatJSONResponse(200, {
      ...verification,
      token: token,
    });
  } catch (err) {
    return handleError(err);
  }
};

type verifyResult = { verified: boolean; message: string };

// authentication
const verify = (token: string): verifyResult => {
  return jwt.verify(token, process.env.JWT_SECRET, (error: Error) => {
    if (error) {
      return {
        verified: false,
        message: 'Invalid token',
      };
    }

    return { verified: true, message: 'Verified' };
  });
};

export const main = middyfy(verifyToken);
