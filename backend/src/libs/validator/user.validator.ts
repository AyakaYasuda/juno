import { formatJSONResponse } from '@libs/api-gateway';

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
}

export default UserValidator;
