import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userEventTable = 'user-event';

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

export const getUserById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const id = event.pathParameters.userId;
    console.log(id);

    const params = {
      TableName: userEventTable,
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
