import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import { middyfy } from '@libs/lambda';
import { AWS } from '@serverless/typescript';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';
const PK_EMAIL_GSI = 'PK-email-index';

const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  isAdmin: yup.boolean().required(),
  message: yup.string(),
  allergy: yup.string(),
});

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

export const createUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const reqBody = JSON.parse(event.body);

    // FIXME : the reference sample was false
    await userSchema.validate(reqBody, { abortEarly: true });

    const firstName = reqBody.firstName;
    const lastName = reqBody.lastName;
    const email = reqBody.email;
    const password = reqBody.password;
    const isAdmin = reqBody.isAdmin;
    const message = reqBody.message;
    const allergy = reqBody.allergy;

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user: IUser = {
      PK: 'user',
      SK: v4(),
      firstName,
      lastName,
      email,
      password: encryptedPW,
      isAdmin,
      message,
      allergy,
    };

    // FIXME : look up the correct type for existingUser
    const existingUser: AWS.DynamoDB.Query = await getUserByEmail(user.email);
    if (existingUser.Items.length > 0) {
      throw new HttpError(500, 'User already exists');
    }

    const params = {
      TableName: USER_EVENT_TABLE,
      Item: user,
    };

    await dynamodb.put(params).promise();

    return formatJSONResponse(200, {
      body: user.SK,
    });
  } catch (err) {
    return handleError(err);
  }
};

const getUserByEmail = async (
  email: string
): Promise<APIGatewayProxyResultV2> => {
  const params = {
    TableName: USER_EVENT_TABLE,
    IndexName: PK_EMAIL_GSI,
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
