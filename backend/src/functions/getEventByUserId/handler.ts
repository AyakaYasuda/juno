import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
// FIXME: use enum
const USER_EVENT_TABLE = 'user-event';

const getEventByUserId = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;

    // 1. fetch eventId by userId
    const fetchEventIdParams = {
      TableName: USER_EVENT_TABLE,
      Key: {
        PK: userId,
      },
    };

    const eventIdData = await dynamodb.get(fetchEventIdParams).promise();
    if (Object.keys(eventIdData).length === 0) {
      throw new HttpError(404, 'EventId Data not found');
    }

    // 2. fetch event by eventId
    const { SK: eventId } = eventIdData.Item;
    const fetchEventParams = {
      TableName: USER_EVENT_TABLE,
      Key: {
        PK: 'event',
        SK: eventId,
      },
    };
    const eventData = await dynamodb.get(fetchEventParams).promise();
    if (Object.keys(eventData).length === 0) {
      throw new HttpError(404, 'EventId Data not found');
    }

    return formatJSONResponse(200, eventData.Item);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getEventByUserId);
