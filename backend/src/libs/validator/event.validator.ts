import { CreateEventReqBody } from '@libs/types/createEventReqBody.type';
import { UpdateEventReqBody } from '@libs/types/updateEventReqBody.type';
import * as yup from 'yup';

class EventValidator {
  private async validate(schema: any, reqBody) {
    // FIXME : the reference sample was false
    await schema.validate(reqBody, { abortEarly: true });
  }

  public validateEventCreateReqBody(reqBody: CreateEventReqBody) {
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

    this.validate(eventSchema, reqBody);
  }

  public validateEventUpdateReqBody(reqBody: UpdateEventReqBody) {
    const eventSchema = yup.object().shape({
      dateWedding: yup.string().required(),
      startingTimeWedding: yup.string().required(),
      endingTimeWedding: yup.string().required(),
      dateWeddingReception: yup.string().required(),
      startingTimeReception: yup.string().required(),
      endingTimeReception: yup.string().required(),
    });

    this.validate(eventSchema, reqBody);
  }
}

export default EventValidator;
