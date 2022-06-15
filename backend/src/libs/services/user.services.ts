import bcrypt from 'bcryptjs';
import { HttpError } from '@libs/api-gateway';
import UserModel from '@libs/model/user.model';
import { ICreateUserReqBody } from '@libs/types/createUserReqBody.type';
import { IUser } from '@libs/types/user.type';

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
}

export default UserServices;
