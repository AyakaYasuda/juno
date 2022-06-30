import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import EventValidator from '@libs/validator/event.validator';
import EventServices from '@libs/services/event.services';

const updateEvent = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const eventId = event.pathParameters.eventId;
    const reqBody = JSON.parse(event.body);

    const eventServices = new EventServices();
    
    await EventValidator.validateEventUpdateReqBody(reqBody);

    const eventData = await eventServices.errorIfEventNotExist(
      eventId,
      'Event not found'
    );

    await eventServices.updateEvent(eventId, eventData, reqBody);

    return formatJSONResponse(204, {
      message: 'Successfully updated the user',
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(updateEvent);
