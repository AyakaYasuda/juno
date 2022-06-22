import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import AuthServices from '@libs/services/auth.services';

const authorizeToken = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const reqBody = JSON.parse(event.body);

    const authServices = new AuthServices();

    const { authorizationToken } = reqBody;

    if (!authorizationToken) {
      throw new HttpError(400, 'Invalid request');
    }

    const authResponse = await authServices.verifyToken(authorizationToken);

    if (authResponse.policyDocument.Statement.Effect === 'Deny') {
      return formatJSONResponse(401, {
        authorized: false,
        message: 'Invalid token',
      });
    }

    return formatJSONResponse(200, {
      ...authResponse,
      token: authorizationToken,
      authorized: true,
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(authorizeToken);
