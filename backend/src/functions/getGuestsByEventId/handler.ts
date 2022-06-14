import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';
const EVENT_USER_GSI = 'eventId-userId-index';

const getGuestsByEventId = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const eventId = event.pathParameters.eventId;

    const params = {
      TableName: USER_EVENT_TABLE,
      IndexName: EVENT_USER_GSI,
      KeyConditionExpression: '#SK = :SK',
      ExpressionAttributeNames: {
        '#SK': 'SK',
      },
      ExpressionAttributeValues: {
        ':SK': eventId,
      },
    };

    const guestsResponseData = await dynamodb.query(params).promise();
    console.log(guestsResponseData);

    if (guestsResponseData.Items.length === 0) {
      throw new HttpError(404, 'Guests not found');
    }

    return formatJSONResponse(200, guestsResponseData.Items);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getGuestsByEventId);
