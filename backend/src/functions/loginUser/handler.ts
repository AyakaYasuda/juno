import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import UserServices from '@libs/services/user.services';
import UserValidator from '@libs/validator/user.validator';
import AuthServices from '@libs/services/auth.services';

const loginUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const reqBody = JSON.parse(event.body);

    const userServices = new UserServices();

    await UserValidator.validateLoginUserReqBody(reqBody);

    const { email, password } = reqBody;

    const existingUser = await userServices.errorIfUserNotExistByEmail(email);

    await userServices.verifyPassword(password, existingUser.password);

    const token = await AuthServices.generateToken(existingUser.SK);

    return formatJSONResponse(200, {
      userId: existingUser.SK,
      token,
    });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(loginUser);
