export type FetchDataState = {
  data: any;
  loading: any;
  hasErrors: any;
};

export type LoginState = {
  email: string;
  password: string;
};

export type SignupState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  message: string;
  allergy: string;
};
