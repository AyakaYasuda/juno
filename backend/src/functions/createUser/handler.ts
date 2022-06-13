import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import { middyfy } from '@libs/lambda';
import { AWS } from '@serverless/typescript';
import { formatJSONResponse } from '@libs/api-gateway';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userEventTable = 'user-event';

const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  isAdmin: yup.boolean().required(),
});

interface IUser {
  PK: string;
  SK: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

/*
============== common modules ==============
*/

// error handling
class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (e: Error) => {
  if (e instanceof yup.ValidationError) {
    return formatJSONResponse(400, {
      message: e.errors,
    });
  }

  if (e instanceof SyntaxError) {
    return formatJSONResponse(400, {
      message: `invalid request body format : "${e.message}"`,
    });
  }

  if (e instanceof HttpError) {
    console.log(e.message);
    return formatJSONResponse(500, {
      message: e.message,
    });
  }

  throw e;
};

/*
  ============================================
  */

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

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user: IUser = {
      PK: 'user',
      SK: v4(),
      firstName,
      lastName,
      email,
      password: encryptedPW,
      isAdmin,
    };

    const existingUser: AWS.DynamoDB.Query = await getUserByEmail(user.email);
    if (existingUser.Items.length > 0) {
      throw new HttpError(500, 'User already exists');
    }

    const params = {
      TableName: userEventTable,
      Item: user,
    };

    await dynamodb.put(params).promise();

    return formatJSONResponse(200, {
      body: user.password,
    });
  } catch (err) {
    return handleError(err);
  }
};

const getUserByEmail = async (
  email: string
): Promise<APIGatewayProxyResultV2> => {
  const params = {
    TableName: userEventTable,
    IndexName: 'PK-email-index',
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
