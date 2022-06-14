import { HttpError } from '@libs/api-gateway';
import { IErrorIfUserNotExistParams } from '@libs/params/user.params';
import { tableNames } from '@libs/tableNames';
import DbModel from './dbModel';

class UserModel extends DbModel {
  constructor() {
    super();
  }

  public async errorIfUserNotExist(
    userId: string,
    userNotExistErrorMessage: string
  ): Promise<void> {
    const fetchUserParams: IErrorIfUserNotExistParams = {
      TableName: tableNames.USER_EVENT,
      Key: {
        PK: 'user',
        SK: userId,
      },
    };

    const data = await this.get(fetchUserParams);

    if (Object.keys(data).length === 0) {
      throw new HttpError(404, userNotExistErrorMessage);
    }
  }
}

export default UserModel;
