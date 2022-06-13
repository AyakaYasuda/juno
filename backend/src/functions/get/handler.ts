import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const hello: APIGatewayProxyHandler = async (event) => {
  return formatJSONResponse({
    message: `Hello GET`,
    event,
  });
};

export const main = middyfy(hello);
