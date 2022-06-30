import { IUser } from './UserData.type';

export interface IEvent {
  SK: string;
  bride: string;
  groom: string;
  dateWedding: string;
  startingTimeWedding: string;
  endingTimeWedding: string;
  dateWeddingReception: string;
  startingTimeReception: string;
  endingTimeReception: string;
  message: string;
  address: string;
  isEditable: boolean;
}

export interface IEventRequest {
  bride: string;
  groom: string;
  dateWedding: string;
  startingTimeWedding: string;
  endingTimeWedding: string;
  dateWeddingReception: string;
  startingTimeReception: string;
  endingTimeReception: string;
  address: string;
  message: string;
}

export interface IEventState {
  event: IEvent;
  guests: IUser[];
  status: string;
  errorMessage: string;
}
