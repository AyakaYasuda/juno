import { IErrorIfUserNotExistParams } from '@libs/params/user.params';
import { tableNames } from '@libs/tableNames';
import DbModel from './dbModel';

class UserModel extends DbModel {
  constructor() {
    super();
  }

  public async errorIfUserNotExist(userId: string): Promise<void> {
    const fetchUserParams: IErrorIfUserNotExistParams = {
      TableName: tableNames.USER_EVENT,
      Key: {
        PK: 'user',
        SK: userId,
      },
    };

    const data = await this.get(fetchUserParams);

    return data;
  }
}

export default UserModel;
