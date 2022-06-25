import useForm from 'hooks/useForm';
import React from 'react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import LabeledInput from '../molecules/LabeledInput';
import { IEventRequest } from 'types/EventData.type';

export type FormInitialValues = {
  bride: string;
  groom: string;
  dateWedding: string;
  startingTimeWedding: string;
  endingTimeWedding: string;
  dateWeddingReception: string;
  startingTimeReception: string;
  endingTimeReception: string;
  address: string;
  message: string;
};

const initialValues: FormInitialValues = {
  bride: '',
  groom: '',
  dateWedding: '',
  startingTimeWedding: '',
  endingTimeWedding: '',
  dateWeddingReception: '',
  startingTimeReception: '',
  endingTimeReception: '',
  address: '',
  message: '',
};

type Props = {
  formInitialValues?: FormInitialValues;
  className?: string;
  updateButtonText: string;
  formSubmitLogic: (formInput: IEventRequest) => void;
};

const EditEventForm = (props: Props) => {
  const { formInitialValues, className, formSubmitLogic } = props;
  const { values, inputChangeHandler } = useForm(
    formInitialValues ? formInitialValues : initialValues
  );
  const {
    bride,
    groom,
    dateWedding,
    startingTimeWedding,
    endingTimeWedding,
    dateWeddingReception,
    startingTimeReception,
    endingTimeReception,
    address,
    message,
  } = values;

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    formSubmitLogic({
      bride: bride as string,
      groom: groom as string,
      dateWedding: dateWedding as string,
      startingTimeWedding: startingTimeWedding as string,
      endingTimeWedding: endingTimeWedding as string,
      dateWeddingReception: dateWeddingReception as string,
      startingTimeReception: startingTimeReception as string,
      endingTimeReception: endingTimeReception as string,
      address: address as string,
      message: message as string,
    });
  };

  return (
    <Card className={className}>
      <form
        onSubmit={submitHandler}
        className="flex flex-col md:flex-row p-4 md:gap-6"
      >
        <div className="md:basis-1/2 flex flex-col">
          <LabeledInput
            label="Bride Name"
            name="bride"
            type="text"
            value={bride as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="mb-1"
          />
          <LabeledInput
            label="Groom Name"
            name="groom"
            type="text"
            value={groom as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="mb-1"
          />
          <LabeledInput
            label="Date and Time of Wedding Ceremony"
            name="dateWedding"
            type="date"
            value={dateWedding as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="mb-1"
          />
          <div className="flex flex-row gap-6">
            <div className="basis-1/2">
              <LabeledInput
                label="Start"
                name="startingTimeWedding"
                type="time"
                value={startingTimeWedding as string}
                onChange={inputChangeHandler}
                inputStyle="InputDark w-full"
                labelStyle="mb-1"
              />
            </div>
            <div className="basis-1/2">
              <LabeledInput
                label="End"
                name="endingTimeWedding"
                type="time"
                value={endingTimeWedding as string}
                onChange={inputChangeHandler}
                inputStyle="InputDark w-full"
                labelStyle="mb-1"
              />
            </div>
          </div>
          <LabeledInput
            label="Date and Time of Wedding Reception"
            name="dateWeddingReception"
            type="date"
            value={dateWeddingReception as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="mb-1"
          />
          <div className="flex flex-row gap-6">
            <div className="basis-1/2">
              <LabeledInput
                label="Start"
                name="startingTimeReception"
                type="time"
                value={startingTimeReception as string}
                onChange={inputChangeHandler}
                inputStyle="InputDark w-full"
                labelStyle="mb-1"
              />
            </div>
            <div className="basis-1/2">
              <LabeledInput
                label="End"
                name="endingTimeReception"
                type="time"
                value={endingTimeReception as string}
                onChange={inputChangeHandler}
                inputStyle="InputDark w-full"
                labelStyle="mb-1"
              />
            </div>
          </div>
        </div>
        <div className="md:basis-1/2 flex flex-col">
          <LabeledInput
            label="Address"
            name="address"
            type="address"
            value={address as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="mb-1"
          />
          <LabeledInput
            label="Message"
            name="message"
            type="textarea"
            value={message as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark h-48 mb-8"
            labelStyle="mb-1"
          />
          <div className="w-10/12 mx-auto md:flex">
            <div className="mb-4 md:mb-0 md:mr-4 basis-1/2">
              <Button customStyle="bg-Pink-default text-White-default">
                Create invitations
              </Button>
            </div>
            <div className="basis-1/2">
              <Button customStyle="text-Pink-default border-2 border-Pink-default">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default EditEventForm;
