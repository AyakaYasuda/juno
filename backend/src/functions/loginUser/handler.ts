import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, HttpError, handleError } from '@libs/api-gateway';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import { middyfy } from '@libs/lambda';
import { AWS } from '@serverless/typescript';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = 'user-event';
const PK_EMAIL_LSI = 'PK-email-index';

const userSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

interface ILoginUserInfo {
  email: string;
  password: string;
}

const loginUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const reqBody = JSON.parse(event.body);

    // FIXME : the reference sample was false
    await userSchema.validate(reqBody, { abortEarly: true });

    const email = reqBody.email;
    const password = reqBody.password;

    if (!email || !password) {
      return formatJSONResponse(401, {
        message: 'Username and password are required',
      });
    }

    const existingUser: AWS.DynamoDB.Query = await getUserByEmail(email);
    console.log(existingUser);
    if (existingUser.Items.length === 0) {
      throw new HttpError(403, 'User does not exist');
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
      return formatJSONResponse(403, {
        message: 'Password is incorrect',
      });
    }

    const loginUserInfo: ILoginUserInfo = {
      email,
      password,
    };

    const token = generateToken(loginUserInfo);

    return formatJSONResponse(200, {
      user: loginUserInfo,
      token,
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
    IndexName: PK_EMAIL_LSI,
    KeyConditionExpression: '#PK = :PK and #email = :email',
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

const generateToken = (loginUserInfo: ILoginUserInfo) => {
  if (!loginUserInfo) {
    return null;
  }

  return jwt.sign(loginUserInfo, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const main = middyfy(loginUser);
