import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import EventServices from '@libs/services/event.services';

const getEventByEventId = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const eventId = event.pathParameters.eventId;
    const eventServices = new EventServices();

    const eventData = await eventServices.getEventData(
      eventId,
      'Event Data not found'
    );

    console.log('eventData', eventData);

    return formatJSONResponse(200, eventData);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getEventByEventId);
