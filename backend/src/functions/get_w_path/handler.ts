import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const hello: APIGatewayProxyHandler = async (event) => {
  console.log("this is an event", event)
  console.log(event.pathParameters);
  
  return formatJSONResponse({
    message: `Hello GET with path parameter`,
    event,
  });
};

export const main = middyfy(hello);
