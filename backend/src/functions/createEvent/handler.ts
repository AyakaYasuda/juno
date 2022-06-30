import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';

import { middyfy } from '@libs/lambda';
import EventValidator from '@libs/validator/event.validator';
import { CreateEventReqBody } from '@libs/types/createEventReqBody.type';
import EventServices from '@libs/services/event.services';
import UserServices from '@libs/services/user.services';

const eventServices = new EventServices();
const userServices = new UserServices();

export const createEvent = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;
    const reqBody: CreateEventReqBody = JSON.parse(event.body);

    await EventValidator.validateEventCreateReqBody(reqBody);

    // check data exists
    await userServices.errorIfUserNotExist(userId, 'User not found!');
    await eventServices.errorIfEventIdDataExist(
      userId,
      'User already has an event!'
    );

    // create event
    const eventId = await eventServices.createEvent(reqBody);

    // create eventUserIsAttending
    await eventServices.createEventUserIsAttending(eventId, userId);

    return formatJSONResponse(200, {
      eventId,
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(createEvent);
