import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { v4 } from 'uuid';
import * as yup from 'yup';
import { middyfy } from '@libs/lambda';
import { AWS } from '@serverless/typescript';

const AWS = require('aws-sdk');
// import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';
const PK_EMAIL_LSI = 'PK-email-index';

const eventSchema = yup.object().shape({
  bride: yup.string().required(),
  groom: yup.string().required(),
  dateWedding: yup.string().required(),
  startingTimeWedding: yup.string().required(),
  endingTimeWedding: yup.string().required(),
  dateWeddingReception: yup.string().required(),
  startingTimeReception: yup.string().required(),
  endingTimeReception: yup.string().required(),
  address: yup.string().required(),
  message: yup.string().required(),
});

interface IEvent {
  PK: string;
  SK: string;
  bride: string;
  groom: string;
  dateWedding: string;
  startingTimeWedding: string;
  endingTimeWedding: string;
  dateWeddingReception: string;
  startingTimeReception: string;
  endingTimeReception: string;
  address: string;
  message: string;
  isEditable: boolean;
}

export const createUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.pathParameters.userId;
    const reqBody = JSON.parse(event.body);

    // FIXME : the reference sample was false
    await eventSchema.validate(reqBody, { abortEarly: true });

    const {
      bride,
      groom,
      dateWedding,
      startingTimeWedding,
      endingTimeWedding,
      dateWeddingReception,
      startingTimeReception,
      endingTimeReception,
      address,
      message,
    } = reqBody;

    const eventData: IEvent = {
      PK: 'event',
      SK: v4(),
      bride,
      groom,
      dateWedding,
      startingTimeWedding,
      endingTimeWedding,
      dateWeddingReception,
      startingTimeReception,
      endingTimeReception,
      address,
      message,
      isEditable: true,
    };

    // FIXME : look up the correct type for existingEvent
    const existingEvent: AWS.DynamoDB.Query = await getEventByUserId(userId);
    if (existingEvent.Items.length > 0) {
      throw new HttpError(500, 'User already has an event!');
    }

    const params = {
      TableName: USER_EVENT_TABLE,
      Item: eventData,
    };

    await dynamodb.put(params).promise();

    return formatJSONResponse(200, {
      userId: user.SK,
    });
  } catch (err) {
    return handleError(err);
  }
};

const getEventByUserId = async (
  userId: string
): Promise<APIGatewayProxyResultV2> => {
  const params = {
    TableName: USER_EVENT_TABLE,
    IndexName: PK_EMAIL_LSI,
    KeyConditionExpression: '#PK = :PK and #email = :email', // 条件を指定
    ExpressionAttributeNames: {
      '#PK': 'PK',
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':PK': 'user',
      ':email': email,
    },
  };
  return await dynamodb.query(params).promise();
};

export const main = middyfy(createUser);
