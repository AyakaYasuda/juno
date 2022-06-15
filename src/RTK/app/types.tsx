export interface FetchDataState {
  data: any;
  loading: any;
  hasErrors: any;
}

export interface IUser {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export interface IUserRes {
  user: IUser;
  userId: string;
  token: string;
}

export interface ILoginReq {
  email: string;
  password: string;
}

export interface ISignupReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  message: string;
  allergy: string;
}
