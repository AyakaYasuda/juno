import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';

interface IUser {
  PK: string;
  SK: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  message: string;
  allergy: string;
}

const getUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;
    const fetchUserParams = {
      TableName: USER_EVENT_TABLE,
      Key: {
        PK: 'user',
        SK: userId,
      },
    };

    const userResponseData = await dynamodb.get(fetchUserParams).promise();

    if (Object.keys(userResponseData).length === 0) {
      throw new HttpError(404, 'User not found');
    }

    const user: IUser = userResponseData.Item;

    const fetchGuestResponseParams = {
      TableName: USER_EVENT_TABLE,
      KeyConditionExpression: '#PK = :PK',
      ExpressionAttributeNames: {
        '#PK': 'PK',
      },
      ExpressionAttributeValues: {
        ':PK': userId,
      },
      ProjectionExpression: 'SK, isAttending',
    };

    const guestResponseData = await dynamodb
      .query(fetchGuestResponseParams)
      .promise();

    console.log(guestResponseData.Items);

    let data: Record<string, unknown> = {};
    if (guestResponseData.Items.length === 0) {
      data = {
        ...user,
      };
    }

    const guestResponse = guestResponseData.Items[0];
    data = {
      ...user,
      isAttending: guestResponse.isAttending,
      eventId: guestResponse.SK,
    };

    return formatJSONResponse(200, data);
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getUserById);
