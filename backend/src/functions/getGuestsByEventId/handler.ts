import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { formatJSONResponse, handleError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import UserServices from '@libs/services/user.services';

const getGuestsByEventId = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const eventId = event.pathParameters.eventId;
    const userServices = new UserServices();

    // FIXME: fix where condition to get data from dynamodb
    const guestsData = await userServices.errorIfGuestsNotFound(
      eventId,
      'Guests not found'
    );

    const guestsArray = await userServices.getGuests(guestsData.Items);

    return formatJSONResponse(200, { guests: guestsArray });
  } catch (err) {
    return handleError(err);
  }
};

export const main = middyfy(getGuestsByEventId);
