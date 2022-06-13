import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import AWS from 'aws-sdk';
import { middyfy } from "@libs/lambda";

AWS.config.update({
  region: 'us-east-1',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const USER_EVENT_TABLE = "user-event";

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
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
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
const getUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const id = event.pathParameters.userId;
    console.log(id);

    const params = {
      TableName: USER_EVENT_TABLE,
      Key: {
        PK: "user",
        SK: id,
      },
    };

    const userResponseData = await dynamodb.get(params).promise();

    response = buildResponse(200, userResponseData.Item);
    return response;
  } catch (err) {
    handleError(err);
  }
};

export const main = middyfy(getUserById);
