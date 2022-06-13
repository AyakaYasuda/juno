import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';

const getUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const id = event.pathParameters.userId;
    const params = {
      TableName: USER_EVENT_TABLE,
      Key: {
        PK: 'user',
        SK: id,
      },
    };

    const userResponseData = await dynamodb.get(params).promise();

    if (Object.keys({ userResponseData }).length === 0) {
      throw new HttpError(404, 'User not found');
    }

    return formatJSONResponse(200, userResponseData.Item);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getUserById);
