import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import EventServices from '@libs/services/event.services';

const getEventByUserId = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;
    const eventServices = new EventServices();

    // 1. fetch eventId by userId
    const eventIdData = await eventServices.getEventIdData(
      userId,
      'EventId Data not found'
    );

    // 2. fetch event by eventId
    const { SK: eventId } = eventIdData;
    const eventData = await eventServices.getEventData(
      eventId,
      'Event Data not found'
    );

    return formatJSONResponse(200, eventData as any);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getEventByUserId);
