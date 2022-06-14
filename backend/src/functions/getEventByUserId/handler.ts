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
    console.log('getEventByUserId', userId);

    // 1. fetch eventId by userId
    const fetchEventIdParams = {
      TableName: USER_EVENT_TABLE,
      KeyConditionExpression: 'PK = :PK',
      ExpressionAttributeValues: {
        ':PK': userId,
      },
    };

    const eventIdData = await dynamodb.query(fetchEventIdParams).promise();
    if (eventIdData.Items.length === 0) {
      throw new HttpError(404, 'EventId Data not found');
    }
    console.log('eventIdData', eventIdData);

    // 2. fetch event by eventId
    const { SK: eventId } = eventIdData.Items[0];

    console.log('eventId', eventId);

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
    console.log('eventData', eventData);
    const {
      startingTimeReception,
      startingTimeWedding,
      message,
      address,
      dateWeddingReception,
      endingTimeReception,
      isEditable,
      groom,
      bride,
      dateWedding,
      endingTimeWedding,
      SK,
    } = eventData.Item;

    const responseData = {
      startingTimeReception,
      startingTimeWedding,
      message,
      address,
      dateWeddingReception,
      endingTimeReception,
      isEditable,
      groom,
      bride,
      dateWedding,
      endingTimeWedding,
      SK,
    };

    return formatJSONResponse(200, responseData);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getEventByUserId);
