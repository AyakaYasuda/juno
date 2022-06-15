import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import UserServices from '@libs/services/user.services';
import UserValidator from '@libs/validator/user.validator';

const updateUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;
    const reqBody = JSON.parse(event.body);

    const userServices = new UserServices();
    UserValidator.validateUpdateUserReqBody(reqBody);

    const userData = await userServices.errorIfUserNotExist(
      userId,
      'User not found'
    );

    await userServices.updateUser(userId, userData, reqBody);

    await userServices.updateGuestAttendanceData(userId, userData, reqBody);

    return formatJSONResponse(204, {
      message: 'Successfully updated the user',
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(updateUserById);
