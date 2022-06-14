import IEventParams from './params';

const AWS = require('aws-sdk');

class DbModel {
  protected dynamodb;
  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient();
  }

  protected async query(params: IEventParams) {
    return await this.dynamodb.query(params).promise();
  }

  protected async get(params: IEventParams) {
    return await this.dynamodb.get(params).promise();
  }

  protected async put(params: IEventParams) {
    return await this.dynamodb.put(params).promise();
  }
}

export default DbModel;
