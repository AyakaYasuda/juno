import { HttpError } from '@libs/api-gateway';
import { tableNames } from '@libs/tableNames';
import { stringifiedJson } from 'aws-sdk/clients/customerprofiles';
import IParams, { IFetchEventIdParams, IFetchEventParams } from './params';

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

  private async getDataWithQuery(
    params: IParams,
    notFoundErrorMessage: string
  ) {
    const data = await this.query(params);
    if (data.Items.length === 0) {
      throw new HttpError(404, notFoundErrorMessage);
    }
    return data;
  }

  private async getDataWithGet(params: IParams, notFoundErrorMessage: string) {
    const data = await this.get(params);
    if (Object.keys(data).length === 0) {
      throw new HttpError(404, notFoundErrorMessage);
    }
    return data;
  }

  public async getEventIdData(
    userId: stringifiedJson,
    notFoundErrorMessage: string
  ) {
    const fetchEventIdParams: IFetchEventIdParams = {
      TableName: tableNames.USER_EVENT,
      KeyConditionExpression: 'PK = :PK',
      ExpressionAttributeValues: {
        ':PK': userId,
      },
    };

    return await this.getDataWithQuery(
      fetchEventIdParams,
      notFoundErrorMessage
    );
  }

  public async getEventData(eventId: string, notFoundErrorMessage: string) {
    const fetchEventParams: IFetchEventParams = {
      TableName: tableNames.USER_EVENT,
      Key: {
        PK: 'event',
        SK: eventId,
      },
      ProjectionExpression: `startingTimeReception,startingTimeWedding,message,address,dateWeddingReception,endingTimeReception,isEditable,groom,bride,dateWedding,endingTimeWedding,SK`,
    };

    return await this.getDataWithGet(fetchEventParams, notFoundErrorMessage);
  }
}

export default EventModel;
