import { HttpError } from '@libs/api-gateway';
import UserModel from '@libs/model/user.model';

class UserServices {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  public async errorIfUserNotExist(
    userId: string,
    userNotExistErrorMessage: string
  ): Promise<void> {
    const data = this.userModel.errorIfUserNotExist(userId);

    if (Object.keys(data).length === 0) {
      throw new HttpError(404, userNotExistErrorMessage);
    }
  }
}

export default UserServices;
