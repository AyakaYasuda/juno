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

const updateUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;
    const reqBody = JSON.parse(event.body);

    const user: any = await getUserById(userId);
    console.log('existingUserData', user);

    const updatedUser = {
      ...user,
      ...reqBody,
      PK: 'user',
      SK: userId,
    };

    const updateUserParams = {
      TableName: USER_EVENT_TABLE,
      Item: updatedUser,
    };

    await dynamodb.put(updateUserParams).promise();

    const guestResponse = {
      PK: userId,
      SK: user.eventId,
      isAttending: reqBody.isAttending,
    };

    const updateIsAttendingParams = {
      TableName: USER_EVENT_TABLE,
      Item: guestResponse,
    };

    await dynamodb.put(updateIsAttendingParams).promise();

    return formatJSONResponse(204, {
      message: 'Successfully updated the user',
    });
  } catch (err) {
    return handleError(err);
  }
};

const getUserById = async (id: string): Promise<APIGatewayProxyResultV2> => {
  const fetchUserParams = {
    TableName: USER_EVENT_TABLE,
    Key: {
      PK: 'user',
      SK: id,
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
      ':PK': id,
    },
    ProjectionExpression: 'SK, isAttending',
  };

  const guestResponseData = await dynamodb
    .query(fetchGuestResponseParams)
    .promise();

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

  return data;
};

export const main = middyfy(updateUserById);
