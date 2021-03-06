import { StateStatus } from './StateStatus.type';

export interface IUser {
  PK: string;
  SK: string;
  userId: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  message: string;
  allergy: string;
  isAttending: boolean;
}

export interface ILoginRequest {
  email: string;
  password: string;
  expirationDate?: Date;
}

export interface ISignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IGuestSignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allergy: string;
  isAttending: boolean;
  message: string;
  isAdmin: boolean;
}

export interface IUpdateUserRequest {
  firstName: string;
  lastName: string;
  message: string;
  allergy: string;
  isAttending: boolean;
}

export interface IGetUserByIdRequest {
  userId: string;
  token: string;
}

export interface IUserState {
  user: IUser;
  status: StateStatus;
  errorMessages: string[];
}

export interface IAuthState {
  user: IUserState;
  status: StateStatus;
}
