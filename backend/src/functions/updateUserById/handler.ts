import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import * as yup from 'yup';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';

const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  isAdmin: yup.boolean().required(),
  message: yup.string(),
  allergy: yup.string(),
});

const updateUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const id = event.pathParameters.userId;
    const reqBody = JSON.parse(event.body);

    // FIXME : the reference sample was false
    await userSchema.validate(reqBody, { abortEarly: true });

    await getUserById(id);

    const updatedUser = {
      ...reqBody,
      PK: 'user',
      SK: id,
    };

    const params = {
      TableName: USER_EVENT_TABLE,
      Item: updatedUser,
    };

    await dynamodb.put(params).promise();

    return formatJSONResponse(204, {
      message: 'Successfully updated the user',
    });
  } catch (err) {
    return handleError(err);
  }
};

const getUserById = async (id: string): Promise<APIGatewayProxyResultV2> => {
  const params = {
    TableName: USER_EVENT_TABLE,
    Key: {
      PK: 'user',
      SK: id,
    },
  };

  const userResponseData = await dynamodb.get(params).promise();

  if (Object.keys(userResponseData).length === 0) {
    throw new HttpError(404, 'User not found');
  }

  return userResponseData.Item;
};

export const main = middyfy(updateUserById);
