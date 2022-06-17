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

export interface IUserState {
  user: IUser;
  status: 'pending' | 'loading' | 'failed';
}

export interface IAuthState {
  user: IUserState;
  status: 'pending' | 'loading' | 'failed';
}
