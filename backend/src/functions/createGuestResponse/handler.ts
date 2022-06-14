import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { AWS } from '@serverless/typescript';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';

export const createGuestResponse = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const eventId = event.pathParameters.eventId;
    const reqBody = JSON.parse(event.body);

    const userId = reqBody.userId;
    const isAttending = reqBody.isAttending;

    if (!userId || !isAttending) {
      return formatJSONResponse(400, {
        message: 'Invalid request',
      });
    }

    const guestResponse = {
      PK: userId,
      SK: eventId,
      isAttending: isAttending,
    };

    const params = {
      TableName: USER_EVENT_TABLE,
      Item: guestResponse,
    };

    await dynamodb.put(params).promise();

    return formatJSONResponse(204, {
      message: 'Successfully sent the response',
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(createGuestResponse);
