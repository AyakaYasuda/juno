import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from TS Lambda!'),
  };
  return response;
};
