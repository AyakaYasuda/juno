import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';

import { middyfy } from '@libs/lambda';
import EventValidator from '@libs/validator/event.validator';
import EventModel from '@libs/model/event.model';
import { CreateEventReqBody } from '@libs/requests/CreateEventReqBody';
import UserModel from '@libs/model/user.model';

const eventValidator = new EventValidator();
const eventModel = new EventModel();
const userModel = new UserModel();

export const createEvent = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;
    const reqBody: CreateEventReqBody = JSON.parse(event.body);

    await eventValidator.validateEventCreateReqBody(reqBody);

    // check data exists
    await userModel.errorIfUserNotExist(userId, 'User not found!');
    await eventModel.errorIfEventIdDataExist(
      userId,
      'User already has an event!'
    );

    // create event
    const eventId = await eventModel.createEvent(reqBody);

    // create eventUserIsAttending
    await eventModel.createEventUserIsAttending(eventId, userId);

    return formatJSONResponse(200, {
      eventId,
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(createEvent);
