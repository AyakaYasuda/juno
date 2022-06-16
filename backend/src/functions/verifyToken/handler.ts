import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import AuthServices from '@libs/services/auth.services';


const verifyToken = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const reqBody = JSON.parse(event.body);

    const authServices = new AuthServices();

    const { token } = reqBody;

    if (!token) {
      throw new HttpError(400, 'Invalid request');
    }

    const verification = await authServices.verifyToken(token);

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

export const main = middyfy(verifyToken);
