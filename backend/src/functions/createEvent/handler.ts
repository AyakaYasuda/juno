import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError, HttpError } from '@libs/api-gateway';
import { v4 } from 'uuid';
import * as yup from 'yup';
import { middyfy } from '@libs/lambda';
import { AWS } from '@serverless/typescript';

const AWS = require('aws-sdk');
// import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';

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

    console.log('createUser userId', userId);

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

    // FIXME: add type to params
    const params = {
      TableName: USER_EVENT_TABLE,
      Item: eventData,
    };

    // create event
    await dynamodb.put(params).promise();

    const eventRelationData = {
      PK: userId,
      SK: eventData.SK,
    };

    const relationParams = {
      TableName: USER_EVENT_TABLE,
      Item: eventRelationData,
    };

    // create event-user
    await dynamodb.put(relationParams).promise();

    return formatJSONResponse(200, {
      eventId: eventData.SK,
    });
  } catch (err) {
    return handleError(err);
  }
};

// FIXME: same code in getEventByUserId. create model class.
const getEventByUserId = async (
  userId: string
): Promise<APIGatewayProxyResultV2> => {
  // 1. fetch eventId by userId
  const fetchEventIdParams = {
    TableName: USER_EVENT_TABLE,
    KeyConditionExpression: 'PK = :PK',
    ExpressionAttributeValues: {
      ':PK': userId,
    },
  };
  console.log('getEventByUserId userId', userId);

  const result = await dynamodb.query(fetchEventIdParams).promise();
  console.log('getEventByUserId result', result);

  return result;
};

export const main = middyfy(createUser);
