import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { IUser } from '@libs/types/user.type';
import * as yup from 'yup';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  code: number,
  response: Record<string, unknown> | IUser
) => {
  return {
    statusCode: code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH,DELETE',
    },
    body: JSON.stringify(response),
  };
};

// error handling
export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleError = (e: Error) => {
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
    return formatJSONResponse(e.statusCode, {
      message: e.message,
    });
  }

  throw e;
};
