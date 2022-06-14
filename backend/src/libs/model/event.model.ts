import { HttpError } from '@libs/api-gateway';
import { CreateEventReqBody } from '@libs/requests/CreateEventReqBody';
import { tableNames } from '@libs/tableNames';
import { stringifiedJson } from 'aws-sdk/clients/customerprofiles';
import { IEvent } from '../types/event.type';
import {
  getFetchEventIdParams,
  ICreateEventParams,
  IFetchEventParams,
} from '../params/event.params';
import { v4 } from 'uuid';

import DbModel from './dbModel';
import { IEventUserIsAttending } from '@libs/types/eventUserIsAttending.type';

class EventModel extends DbModel {
  constructor() {
    super();
  }

  // FIXME: add type to return value, Promise<EventIdData[]>
  public async getEventIdData(
    userId: stringifiedJson,
    notFoundErrorMessage: string
  ) {
    const fetchEventIdParams = getFetchEventIdParams(userId);
    const data = await this.query(fetchEventIdParams);

    if (data.Items.length === 0) {
      throw new HttpError(404, notFoundErrorMessage);
    }

    return data;
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

    const data = await this.get(fetchEventParams);

    if (Object.keys(data).length === 0) {
      throw new HttpError(404, notFoundErrorMessage);
    }

    return data;
  }

  public async errorIfEventIdDataExist(
    userId: string,
    eventExistErrorMessage: string
  ) {
    const fetchEventIdParams = getFetchEventIdParams(userId);

    const existingEvent = await this.query(fetchEventIdParams);

    if (existingEvent.Items.length > 0) {
      throw new HttpError(500, eventExistErrorMessage);
    }
  }

  public async createEvent(reqBody: CreateEventReqBody): Promise<string> {
    const {
      bride,
      groom,
      dateWedding,
      startingTimeWedding,
      endingTimeWedding,
      dateWeddingReception,
      startingTimeReception,
      endingTimeReception,
      address,
      message,
    } = reqBody;

    const eventId = v4();

    const eventData: IEvent = {
      PK: 'event',
      SK: eventId,
      bride,
      groom,
      dateWedding,
      startingTimeWedding,
      endingTimeWedding,
      dateWeddingReception,
      startingTimeReception,
      endingTimeReception,
      address,
      message,
      isEditable: true,
    };

    const createEventParams: ICreateEventParams = {
      TableName: tableNames.USER_EVENT,
      Item: eventData,
    };

    await this.put(createEventParams);

    return eventId;
  }

  public async createEventUserIsAttending(eventId: string, userId: string) {
    const eventUserIsAttendingData: IEventUserIsAttending = {
      PK: userId,
      SK: eventId,
    };

    const EventUserIsAttendingParams = {
      TableName: tableNames.USER_EVENT,
      Item: eventUserIsAttendingData,
    };

    await this.put(EventUserIsAttendingParams);
  }
}

export default EventModel;
