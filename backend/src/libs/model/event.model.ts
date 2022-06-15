import { HttpError } from '@libs/api-gateway';
import { tableNames } from '@libs/tableNames';
import { IEvent } from '../types/event.type';
import {
  getFetchEventIdParams,
  ICreateEventParams,
  IFetchEventParams,
} from '../params/event.params';

import DbModel from './dbModel';
import { IEventUserIsAttending } from '@libs/types/eventUserIsAttending.type';

// FIXME: move validator to service class
// model class should focus only on CRUD
class EventModel extends DbModel {
  constructor() {
    super();
  }

  // FIXME: add type to return value, Promise<EventIdData[]>
  public async getEventIdData(userId: string) {
    const fetchEventIdParams = getFetchEventIdParams(userId);
    const data = await this.query(fetchEventIdParams);

    return data;
  }

  public async getEventData(eventId: string) {
    const fetchEventParams: IFetchEventParams = {
      TableName: tableNames.USER_EVENT,
      Key: {
        PK: 'event',
        SK: eventId,
      },
      ProjectionExpression: `startingTimeReception,startingTimeWedding,message,address,dateWeddingReception,endingTimeReception,isEditable,groom,bride,dateWedding,endingTimeWedding,SK`,
    };

    const data = await this.get(fetchEventParams);

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

  public async createEvent(eventData: IEvent): Promise<void> {
    const createEventParams: ICreateEventParams = {
      TableName: tableNames.USER_EVENT,
      Item: eventData,
    };

    await this.put(createEventParams);
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

  public async updateEvent(eventData: any) {
    const params = {
      TableName: tableNames.USER_EVENT,
      Item: eventData,
    };

    await this.put(params);
  }
}

export default EventModel;
