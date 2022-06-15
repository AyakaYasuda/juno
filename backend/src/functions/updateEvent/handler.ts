import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import EventValidator from '@libs/validator/event.validator';
import EventModel from '@libs/model/event.model';

const updateEvent = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const eventId = event.pathParameters.eventId;
    const reqBody = JSON.parse(event.body);
    const eventModel = new EventModel();

    const eventValidator = new EventValidator();
    eventValidator.validateEventUpdateReqBody(reqBody);

    const eventData = await eventModel.errorIfEventNotExist(
      eventId,
      'Event not found'
    );

    await eventModel.updateEvent(eventId, eventData, reqBody);

    return formatJSONResponse(204, {
      message: 'Successfully updated the user',
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(updateEvent);
