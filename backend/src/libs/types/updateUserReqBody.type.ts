export interface IUpdateUserReqBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  message: string;
  allergy: string;
  isAttending: boolean;
}
