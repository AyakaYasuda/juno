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

    console.log('data', data);
    if (Object.keys(data).length === 0) {
      throw new HttpError(404, userNotExistErrorMessage);
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
      throw new HttpError(500, 'User does not exist');
    }

    return existingUser.Items[0];
  }

  public async verifyPassword(inputPW: string, existingPW: string) {
    if (!bcrypt.compareSync(inputPW, existingPW)) {
      throw new HttpError(403, 'Password is incorrect');
    }
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
}

export default UserServices;
