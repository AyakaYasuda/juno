import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import UserValidator from '@libs/validator/user.validator';
import UserServices from '@libs/services/user.services';

export const createGuestResponse = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const eventId = event.pathParameters.eventId;
    const reqBody = JSON.parse(event.body);
    const { userId, isAttending } = reqBody;

    console.log('userId', userId);
    console.log('isAttending', isAttending);

    const userServices = new UserServices();

    UserValidator.validateCreateGuestResponseParams(userId, isAttending);

    await userServices.createGuestAttendanceData(userId, eventId, isAttending);

    return formatJSONResponse(204, {
      message: 'Successfully sent the response',
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(createGuestResponse);
