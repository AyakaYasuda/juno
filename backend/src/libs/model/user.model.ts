import { IErrorIfUserNotExistParams } from '@libs/params/user.params';
import { tableNames } from '@libs/tableNames';
import DbModel from './dbModel';

class UserModel extends DbModel {
  constructor() {
    super();
  }

  // FIXME: add type to return value
  public async getUserByUserId(userId: string): Promise<any> {
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
