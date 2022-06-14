import { tableNames } from '@libs/tableNames';

export type IFetchEventIdParams = {
  TableName: tableNames.USER_EVENT;
  KeyConditionExpression: 'PK = :PK';
  ExpressionAttributeValues: {
    ':PK': string;
  };
};

export type IFetchEventParams = {
  TableName: tableNames.USER_EVENT;
  Key: {
    PK: 'event';
    SK: string;
  };
  ProjectionExpression: string;
};

type IParams = IFetchEventIdParams | IFetchEventParams;

export default IParams;
