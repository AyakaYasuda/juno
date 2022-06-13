import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

const AWS = require("aws-sdk");
const USERS_TABLE = "usersTable"

const hello: APIGatewayProxyHandler = async (_) => {
  // Create the DynamoDB service object
  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    TableName: USERS_TABLE,
    Key: {
      'id': {S: '1'},
      'name': {S: 'sample tarou'}
    },
  };

  // Call DynamoDB to read the item from the table
  let res
  
  await ddb.getItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(data);      
      res = data
      console.log("Success", data.Item);
    }
  });

  console.log("data is ", res);
  
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

export const main = middyfy(hello);
