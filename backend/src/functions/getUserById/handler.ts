import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';

// error handling
class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

const handleError = (e: unknown) => {
  if (e instanceof HttpError) {
    return formatJSONResponse(e.statusCode, {
      message: e.message,
    });
  }

  throw e;
};

const getUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const id = event.pathParameters.userId;
    console.log(id);

    const params = {
      TableName: USER_EVENT_TABLE,
      Key: {
        PK: 'user',
        SK: id,
      },
    };

    const userResponseData = await dynamodb.get(params).promise();

    return formatJSONResponse(200, userResponseData.Item);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getUserById);
