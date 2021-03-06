import { tableNames } from '@libs/tableNames';
import { IEventUserIsAttending } from '@libs/types/eventUserIsAttending.type';
import { IEvent } from '../types/event.type';

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

export type ICreateEventParams = {
  TableName: tableNames.USER_EVENT;
  Item: IEvent;
};

export type IEventUserIsAttendingParams = {
  TableName: tableNames.USER_EVENT;
  Item: IEventUserIsAttending;
};

type IEventParams =
  | IFetchEventIdParams
  | IFetchEventParams
  | ICreateEventParams
  | IEventUserIsAttendingParams;

export const getFetchEventIdParams = (userId: string): IFetchEventIdParams => ({
  TableName: tableNames.USER_EVENT,
  KeyConditionExpression: 'PK = :PK',
  ExpressionAttributeValues: {
    ':PK': userId,
  },
});

export default IEventParams;
