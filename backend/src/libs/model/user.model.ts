import { HttpError } from '@libs/api-gateway';
import { IErrorIfUserNotExistParams } from '@libs/params/user.params';
import { tableNames } from '@libs/tableNames';
import { IUser } from '@libs/types/user.type';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import DbModel from './dbModel';

class UserModel extends DbModel {
  constructor() {
    super();
  }

  public async createUser(userData: IUser): Promise<any> {
    const params = {
      TableName: tableNames.USER_EVENT,
      Item: userData,
    };

    await this.put(params);
  }

  public async getUserByUserId(userId: string): Promise<IUser> {
    const fetchUserParams: IErrorIfUserNotExistParams = {
      TableName: tableNames.USER_EVENT,
      Key: {
        PK: 'user',
        SK: userId,
      },
    };

    const userData = await this.get(fetchUserParams);

    // FIXME: move logic to service class
    // model class should focus pure data connection
    const guestAttendanceData = await this.getGuestAttendanceData(userId);

    // FIXME: move logic to service class
    if (
      Object.keys(userData).length === 0 ||
      Object.keys(guestAttendanceData).length === 0
    ) {
      throw new HttpError(404, 'User not found');
    }

    let data: IUser;

    if (Object.keys(guestAttendanceData).length === 0) {
      data = {
        ...userData.Item,
      };
    }

    data = {
      ...userData.Item,
      userId: userData.Item.SK,
      eventId: guestAttendanceData.SK,
      isAttending: guestAttendanceData.isAttending,
    };

    return data;
  }

  private async getGuestAttendanceData(userId: string): Promise<any> {
    const params = {
      TableName: tableNames.USER_EVENT,
      KeyConditionExpression: '#PK = :PK',
      ExpressionAttributeNames: {
        '#PK': 'PK',
      },
      ExpressionAttributeValues: {
        ':PK': userId,
      },
      ProjectionExpression: 'SK, isAttending',
    };

    const guestAttendanceData = await this.query(params);

    return guestAttendanceData.Items[0];
  }

  // FIXME: change to createUser?
  public async createGuestAttendanceData(
    userId: string,
    eventId: string,
    isAttending: boolean
  ) {
    const guestAttendanceData = {
      PK: userId,
      SK: eventId,
      isAttending: isAttending,
    };

    const params = {
      TableName: tableNames.USER_EVENT,
      Item: guestAttendanceData,
    };

    await this.put(params);
  }

  // FIXME: add type to return value
  public async getUserByEmail(
    email: string
  ): Promise<APIGatewayProxyResultV2<any>> {
    const PK_EMAIL_LSI = 'PK-email-index';

    const params = {
      TableName: tableNames.USER_EVENT,
      IndexName: PK_EMAIL_LSI,
      KeyConditionExpression: '#PK = :PK and #email = :email', // 条件を指定
      ExpressionAttributeNames: {
        '#PK': 'PK',
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':PK': 'user',
        ':email': email,
      },
    };
    return await this.query(params);
  }

  public async updateGuestAttendanceData(
    userId: string,
    eventId: string,
    isAttending: boolean
  ) {
    const guestAttendanceData = {
      PK: userId,
      SK: eventId,
      isAttending: isAttending,
    };

    const params = {
      TableName: tableNames.USER_EVENT,
      Item: guestAttendanceData,
    };

    await this.put(params);
  }

  public async updateUser(userData: any) {
    const params = {
      TableName: tableNames.USER_EVENT,
      Item: userData,
    };

    await this.put(params);
  }

  public async getGuestsByEventId(eventId: string) {
    const EVENT_USER_GSI = 'eventId-userId-index';

    const params = {
      TableName: tableNames.USER_EVENT,
      IndexName: EVENT_USER_GSI,
      KeyConditionExpression: '#SK = :SK',
      ExpressionAttributeNames: {
        '#SK': 'SK',
      },
      ExpressionAttributeValues: {
        ':SK': eventId,
      },
    };

    return await this.query(params);
  }
}

export default UserModel;
