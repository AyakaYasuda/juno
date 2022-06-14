import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';

const getGuestsByEventId = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getGuestsByEventId);
