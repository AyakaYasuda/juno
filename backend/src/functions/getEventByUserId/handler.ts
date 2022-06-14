import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import EventModel from '@libs/model/event.model';

const getEventByUserId = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;
    const eventModel = new EventModel();

    // 1. fetch eventId by userId
    const eventIdData = await eventModel.getEventIdData(
      userId,
      'EventId Data not found'
    );

    // 2. fetch event by eventId
    const { SK: eventId } = eventIdData.Items[0];
    const eventData = await eventModel.getEventData(
      eventId,
      'EventId Data not found'
    );

    return formatJSONResponse(200, eventData);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getEventByUserId);
