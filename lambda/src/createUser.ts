import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcrypt';

AWS.config.update({
  region: 'us-east-1',
});

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

let response: IResponse;

/*
============== common modules ==============
*/
interface IResponse {
  statusCode: number;
  headers: {
    [key: string]: string;
  };
  body: string;
}

export const buildResponse = (statusCode: number, body: any) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};

// error handling
class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

const handleError = (e: unknown) => {
  if (e instanceof yup.ValidationError) {
    response = buildResponse(
      400,
      JSON.stringify({
        errors: e.errors,
      })
    );
    return response;
  }

  if (e instanceof SyntaxError) {
    response = buildResponse(
      400,
      JSON.stringify({
        errors: `invalid request body format : "${e.message}"`,
      })
    );
    return response;
  }

  if (e instanceof HttpError) {
    response = buildResponse(
      e.statusCode,
      JSON.stringify({
        errors: e.message,
      })
    );
    return response;
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
    console.log(reqBody);

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

    const params = {
      TableName: userEventTable,
      Item: user,
      Expected: {
        hash: {
          Value: 'email',
          Exists: false,
        },
      },
    };

    await dynamodb.put(params).promise();

    response = buildResponse(200, JSON.stringify(user.password));

    return response;
  } catch (err) {
    handleError(err);
  }
};
