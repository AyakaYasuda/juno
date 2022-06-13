import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const AWS = require("aws-sdk");

const hello: APIGatewayProxyHandler = async (_) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const userInformation = {
    TableName: "usersTable",
    Item: {
      id: "1",
      name: 'sample tarou',
      emal: 'sample-tarou@sample.com',
      age: 30
    },
  };

  // await忘れるとデータの書き込みが終わる前にreturnされてしまう
  await docClient
    .put(userInformation)
    .promise()
    .catch((err) =>
      console.error(JSON.stringify(err))
    );

  return {
    statusCode: 200,
    body: JSON.stringify("Successfully data has been written."),
  };
};

export const main = middyfy(hello);
