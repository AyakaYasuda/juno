import * as yup from 'yup';

import { formatJSONResponse } from '@libs/api-gateway';
import { ICreateUserReqBody } from '@libs/types/createUserReqBody.type';
import { IUpdateUserReqBody } from '@libs/types/updateUserReqBody.type';

class UserValidator {
  public static validateCreateGuestResponseParams(
    userId: string,
    isAttending: boolean
  ) {
    if (!userId || !isAttending) {
      return formatJSONResponse(400, {
        message: 'Invalid request',
      });
    }
  }

  public static async validateCreateUserParams(reqBody: ICreateUserReqBody) {
    const userSchema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
      isAdmin: yup.boolean().required(),
      message: yup.string(),
      allergy: yup.string(),
    });

    // FIXME : the reference sample was false
    await userSchema.validate(reqBody, { abortEarly: true });
  }

  public static async validateUpdateUserReqBody(reqBody: IUpdateUserReqBody) {
    const userSchema = yup.object().shape({
      firstName: yup.string(),
      lastName: yup.string(),
      email: yup.string(),
      password: yup.string(),
      isAdmin: yup.boolean(),
      message: yup.string(),
      allergy: yup.string(),
      isAttending: yup.boolean(),
    });

    // FIXME : the reference sample was false
    await userSchema.validate(reqBody, { abortEarly: true });
  }
}

export default UserValidator;
