import * as yup from 'yup';
import { CreateEventReqBody } from '@libs/types/createEventReqBody.type';
import { UpdateEventReqBody } from '@libs/types/updateEventReqBody.type';

class EventValidator {
  public static async validateEventCreateReqBody(reqBody: CreateEventReqBody) {
    const eventSchema = yup.object().shape({
      bride: yup.string().required(),
      groom: yup.string().required(),
      dateWedding: yup.string().required(),
      startingTimeWedding: yup.string().required(),
      endingTimeWedding: yup.string().required(),
      dateWeddingReception: yup.string().required(),
      startingTimeReception: yup.string().required(),
      endingTimeReception: yup.string().required(),
      address: yup.string().required(),
      message: yup.string().required(),
    });

    await eventSchema.validate(reqBody, { abortEarly: true });
  }

  public static async validateEventUpdateReqBody(reqBody: UpdateEventReqBody) {
    const eventSchema = yup.object().shape({
      bride: yup.string(),
      groom: yup.string(),
      dateWedding: yup.string(),
      startingTimeWedding: yup.string(),
      endingTimeWedding: yup.string(),
      dateWeddingReception: yup.string(),
      startingTimeReception: yup.string(),
      endingTimeReception: yup.string(),
      address: yup.string().required(),
      message: yup.string().required(),
      isEditable: yup.boolean(),
    });

    await eventSchema.validate(reqBody, { abortEarly: true });
  }
}

export default EventValidator;
