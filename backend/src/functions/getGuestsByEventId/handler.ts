import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';
const EVENT_USER_GSI = 'eventId-userId-index';

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

    const responseData = await dynamodb.query(params).promise();

    if (responseData.Items.length === 0) {
      throw new HttpError(404, 'Guests not found');
    }

    // 1) iterate the array of responseData.Items and take only PK values
    let userIdArray: Array<{ userId: string }> = [];
    for (const obj of responseData.Items) {
      if (obj.PK && obj.PK !== 'event') {
        userIdArray.push(obj.PK);
      }
    }

    // 2) create a new array of user metadata (obj)
    let usersArray: Array<IUser> = [];
    for (const userId of userIdArray) {
      const fetchGuestDataParams = {
        TableName: USER_EVENT_TABLE,
        Key: {
          PK: 'user',
          SK: userId,
        },
      };

      const guestResponseData = await dynamodb
        .get(fetchGuestDataParams)
        .promise();

      if (Object.keys(guestResponseData).length === 0) {
        throw new HttpError(404, 'Guest who has the provided userId not found');
      }

      usersArray.push(guestResponseData.Item);
    }

    // 3) pick up the user who is NOT admin and create an array of guests
    const guestsArray = usersArray.filter((user) => user.isAdmin === false);

    return formatJSONResponse(200, { guests: guestsArray });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getGuestsByEventId);
