import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { v4 } from 'uuid';

import { middyfy } from '@libs/lambda';
import { ICreateUserReqBody } from '@libs/types/createUserReqBody.type';
import UserValidator from '@libs/validator/user.validator';
import UserServices from '@libs/services/user.services';
import AuthServices from '@libs/services/auth.services';

// import AWS from 'aws-sdk';

export const createUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const reqBody: ICreateUserReqBody = JSON.parse(event.body);
    const userServices = new UserServices();

    await UserValidator.validateCreateUserParams(reqBody);

    const { email } = reqBody;

    await userServices.errorIfUserExists(email);

    const userId = v4();
    await userServices.createUser(userId, reqBody);

    const token = await AuthServices.generateToken(userId);

    return formatJSONResponse(200, {
      userId,
      token,
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(createUser);
