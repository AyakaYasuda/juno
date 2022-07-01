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
    await UserValidator.validateUpdateUserReqBody(reqBody);

    await userServices.errorIfUserNotExist(userId, 'User not found');

    const userData = await userServices.getUserData(userId);
    console.log('userData', userData);

    await userServices.updateUser(userId, userData, reqBody);

    if (reqBody.isAttending) {
      await userServices.updateGuestAttendanceData(userId, userData, reqBody);
    }

    return formatJSONResponse(204, {
      message: 'Successfully updated the user',
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(updateUserById);
