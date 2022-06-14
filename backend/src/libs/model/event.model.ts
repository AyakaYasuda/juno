import { HttpError } from '@libs/api-gateway';
import IParams from './params';

const AWS = require('aws-sdk');

class EventModel {
  private dynamodb;
  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient();
  }

  private async query(params: IParams) {
    return await this.dynamodb.query(params).promise();
  }

  private async get(params: IParams) {
    return await this.dynamodb.get(params).promise();
  }

  public async getDataWithQuery(params: IParams, notFoundErrorMessage: string) {
    const data = await this.query(params);
    if (data.Items.length === 0) {
      throw new HttpError(404, notFoundErrorMessage);
    }
    return data;
  }

  public async getDataWithGet(params: IParams, notFoundErrorMessage: string) {
    const data = await this.get(params);
    if (Object.keys(data).length === 0) {
      throw new HttpError(404, notFoundErrorMessage);
    }
    return data;
  }
}

export default EventModel;
