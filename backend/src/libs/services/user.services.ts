import bcrypt from 'bcryptjs';
import { HttpError } from '@libs/api-gateway';
import UserModel from '@libs/model/user.model';
import { ICreateUserReqBody } from '@libs/types/createUserReqBody.type';
import { IUser } from '@libs/types/user.type';
import { IUpdateUserReqBody } from '@libs/types/updateUserReqBody.type';

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
  ) {
    const data = await this.userModel.getUserByUserId(userId);

    if (Object.keys(data).length === 0) {
      throw new HttpError(404, userNotExistErrorMessage);
    }

    return data;
  }

  public async getUserData(userId: string) {
    const userData = await this.userModel.getUserByUserId(userId);

    const guestAttendanceData = await this.userModel.getGuestAttendanceData(
      userId
    );

    if (Object.keys(userData).length === 0) {
      throw new HttpError(404, 'User not found');
    }

    let data: IUser;
    if (guestAttendanceData.Items.length === 0) {
      data = {
        ...userData,
      };
    } else {
      data = {
        ...userData,
        userId: userData.SK,
        eventId: guestAttendanceData.Items[0].SK,
        isAttending: guestAttendanceData.Items[0].isAttending,
      };
    }

    return data;
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

  public async errorIfUserNotExistByEmail(email: string) {
    const existingUser = await this.userModel.getUserByEmail(email);

    if (existingUser.Items.length === 0) {
      throw new HttpError(404, 'User does not exist');
    }

    return existingUser.Items[0];
  }

  public async verifyPassword(inputPW: string, existingPW: string) {
    if (!bcrypt.compareSync(inputPW, existingPW)) {
      throw new HttpError(403, 'Password is incorrect');
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

    // 2) create a new array of user metadata (obj)
    const usersList = await this.getUsers(userIdArray);

    // 3) pick up the user who is NOT admin and create an array of guests
    const guestsArray = this.getGuestsFromUsersList(usersList);

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
      const guestResponseData = await this.getUserData(userId);

      if (Object.keys(guestResponseData).length === 0) {
        throw new HttpError(
          404,
          'Guest who has the provided userId is not found'
        );
      }

      usersList.push(guestResponseData);
    }

    return usersList;
  }

  private getGuestsFromUsersList(usersList: IUser[]) {
    return usersList.filter((user) => user.isAdmin === false);
  }

  public async updateGuestAttendanceData(
    userId: string,
    userData: any,
    reqBody: IUpdateUserReqBody
  ) {
    const eventId = userData.eventId;
    const isAttending = reqBody.isAttending;

    await this.userModel.updateGuestAttendanceData(
      userId,
      eventId,
      isAttending
    );
  }

  public async updateUser(
    userId: string,
    userData: any,
    reqBody: IUpdateUserReqBody
  ) {
    const updatedUserData = {
      ...userData,
      ...reqBody,
      PK: 'user',
      SK: userId,
    };

    await this.userModel.updateUser(updatedUserData);
  }
}

export default UserServices;
