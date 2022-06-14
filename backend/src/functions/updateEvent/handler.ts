import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import * as yup from 'yup';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';

const eventSchema = yup.object().shape({
  dateWedding: yup.string().required(),
  startingTimeWedding: yup.string().required(),
  endingTimeWedding: yup.string().required(),
  dateWeddingReception: yup.string().required(),
  startingTimeReception: yup.string().required(),
  endingTimeReception: yup.string().required(),
});

const updateEvent = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  console.log('updateEvent');

  try {
    const eventId = event.pathParameters.eventId;
    const reqBody = JSON.parse(event.body);
    console.log('eventId', eventId);

    // FIXME : the reference sample was false
    await eventSchema.validate(reqBody, { abortEarly: true });

    await throwErrorIfEventNotExist(eventId);

    const updatedEvent = {
      ...reqBody,
      PK: 'event',
      SK: eventId,
    };

    const params = {
      TableName: USER_EVENT_TABLE,
      Item: updatedEvent,
    };

    const result = await dynamodb.put(params).promise();
    console.log('result', result);

    return formatJSONResponse(204, {
      message: 'Successfully updated the user',
    });
  } catch (err) {
    return handleError(err);
  }
};

const throwErrorIfEventNotExist = async (
  eventId: string
): Promise<APIGatewayProxyResultV2> => {
  const params = {
    TableName: USER_EVENT_TABLE,
    Key: {
      PK: 'event',
      SK: eventId,
    },
  };

  const eventResponseData = await dynamodb.get(params).promise();
  console.log('throwErrorIfEventNotExist eventResponseData', eventResponseData);

  if (Object.keys(eventResponseData).length === 0) {
    throw new HttpError(404, 'Event not found');
  }

  return eventResponseData.Item;
};

export const main = middyfy(updateEvent);
