import { HttpError } from '@libs/api-gateway';
import { CreateEventReqBody } from '@libs/types/createEventReqBody.type';
import { IEvent } from '@libs/types/event.type';
import { UpdateEventReqBody } from '@libs/types/updateEventReqBody.type';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 } from 'uuid';
import EventModel from '../model/event.model';

class EventServices {
  private eventModel: EventModel;

  constructor() {
    this.eventModel = new EventModel();
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

    // FIXME: add try-catch
    await this.eventModel.createEvent(eventData);

    return eventId;
  }

  public async getEventIdData(userId: string, notFoundErrorMessage: string) {
    const data = await this.eventModel.getEventIdData(userId);

    if (data.Items.length === 0) {
      throw new HttpError(404, notFoundErrorMessage);
    }

    return data;
  }

  public async getEventData(eventId: string, notFoundErrorMessage: string) {
    const data = await this.eventModel.getEventData(eventId);

    if (Object.keys(data).length === 0) {
      throw new HttpError(404, notFoundErrorMessage);
    }

    return data;
  }

  public async updateEvent(
    eventId: string,
    eventData: any,
    reqBody: UpdateEventReqBody
  ) {
    const updatedEventData = {
      ...eventData,
      ...reqBody,
      PK: 'event',
      SK: eventId,
    };

    await this.eventModel.updateEvent(updatedEventData);
  }

  public async createEventUserIsAttending(eventId: string, userId: string) {
    await this.eventModel.createEventUserIsAttending(eventId, userId);
  }

  public async errorIfEventIdDataExist(
    userId: string,
    eventExistErrorMessage: string
  ) {
    const existingEvent = await this.eventModel.getEventIdData(userId);

    if (existingEvent.Items.length > 0) {
      throw new HttpError(500, eventExistErrorMessage);
    }
  }

  public async errorIfEventNotExist(
    eventId: string,
    eventNotExistErrorMessage: string
  ): Promise<APIGatewayProxyResultV2<any>> {
    const eventResponseData = await this.eventModel.getEventData(eventId);

    if (Object.keys(eventResponseData).length === 0) {
      throw new HttpError(404, eventNotExistErrorMessage);
    }

    return eventResponseData.Item;
  }
}

export default EventServices;
