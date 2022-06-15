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

  // FIXME: change to createUser?
  public async createGuestAttendanceData(
    userId: string,
    eventId: string,
    isAttending: boolean
  ) {
    const guestResponse = {
      PK: userId,
      SK: eventId,
      isAttending: isAttending,
    };

    console.log('guestResponse', guestResponse);

    const params = {
      TableName: tableNames.USER_EVENT,
      Item: guestResponse,
    };

    await this.put(params);
  }
}

export default UserModel;
