import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import UserServices from '@libs/services/user.services';

const getUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;

    const userServices = new UserServices();

    await userServices.errorIfUserNotExist(userId, 'User not found');

    const userData = await userServices.getUserData(userId);

    return formatJSONResponse(200, userData);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getUserById);
