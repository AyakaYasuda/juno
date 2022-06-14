import IAllParams from '@libs/params/params';

const AWS = require('aws-sdk');

class DbModel {
  protected dynamodb;
  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient();
  }

  protected async query(params: IAllParams) {
    return await this.dynamodb.query(params).promise();
  }

  protected async get(params: IAllParams) {
    return await this.dynamodb.get(params).promise();
  }

  protected async put(params: IAllParams) {
    return await this.dynamodb.put(params).promise();
  }
}

export default DbModel;
