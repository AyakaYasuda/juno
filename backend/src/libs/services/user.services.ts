import bcrypt from 'bcryptjs';
import { HttpError } from '@libs/api-gateway';
import UserModel from '@libs/model/user.model';
import { ICreateUserReqBody } from '@libs/types/createUserReqBody.type';
import { IUser } from '@libs/types/user.type';
import { tableNames } from '@libs/tableNames';

class UserServices {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  public async createUser(userId: string, reqBody: ICreateUserReqBody) {
    const { firstName, lastName, email, password, isAdmin, message, allergy } =
      reqBody;

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);

    const userData: IUser = {
      PK: 'user',
      SK: userId,
      firstName,
      lastName,
      email,
      password: encryptedPW,
      isAdmin,
      message,
      allergy,
    };

    console.log('createUser userData', userData);

    await this.userModel.createUser(userData);
  }

  public async errorIfUserNotExist(
    userId: string,
    userNotExistErrorMessage: string
  ): Promise<void> {
    const data = await this.userModel.getUserByUserId(userId);

    if (Object.keys(data).length === 0) {
      throw new HttpError(404, userNotExistErrorMessage);
    }
  }

  public async createGuestAttendanceData(
    userId: string,
    eventId: string,
    isAttending: boolean
  ) {
    await this.userModel.createGuestAttendanceData(
      userId,
      eventId,
      isAttending
    );
  }

  public async errorIfUserExists(email: string) {
    const existingUser = await this.userModel.getUserByEmail(email);

    if (existingUser.Items.length > 0) {
      throw new HttpError(500, 'User already exists');
    }
  }

  public async errorIfGuestsNotFound(
    eventId: string,
    guestsNotFoundErrorMessage: string
  ) {
    const guestsData = await this.userModel.getGuestsByEventId(eventId);

    if (guestsData.Items.length === 0) {
      throw new HttpError(404, guestsNotFoundErrorMessage);
    }

    return guestsData;
  }

  // FIXME: pure data will come after userServices.errorIfGuestsNotFound is fixed
  public async getGuests(guestsData: any) {
    // 1) iterate the array of responseData.Items and take only PK values
    const userIdArray = this.getUserIdList(guestsData);
    console.log('getGuestsByEventId userIdArray', userIdArray);

    // 2) create a new array of user metadata (obj)
    const usersList = await this.getUsers(userIdArray);

    // 3) pick up the user who is NOT admin and create an array of guests
    const guestsArray = this.getGuestsFromUsersList(usersList);
    console.log('getGuestsByEventId usersList', usersList);
    console.log('getGuestsByEventId guestsArray', guestsArray);

    return guestsArray;
  }

  private getUserIdList(guestsData: any) {
    let userIdList: Array<string> = [];

    for (const obj of guestsData) {
      if (obj.PK && obj.PK !== 'event') {
        userIdList.push(obj.PK);
      }
    }

    return userIdList;
  }

  private async getUsers(userIdList: string[]) {
    let usersList: Array<IUser> = [];
    for (const userId of userIdList) {
      const guestResponseData = await this.userModel.getUserByUserId(userId);

      console.log('getGuestsByEventId guestResponseData', guestResponseData);

      if (Object.keys(guestResponseData).length === 0) {
        throw new HttpError(
          404,
          'Guest who has the provided userId is not found'
        );
      }

      usersList.push(guestResponseData.Item);
    }

    return usersList;
  }

  private getGuestsFromUsersList(usersList: IUser[]) {
    return usersList.filter((user) => user.isAdmin === false);
  }
}

export default UserServices;
