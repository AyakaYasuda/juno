import React from 'react';
import { IUpdateUserRequest } from 'types/UserData.type';
import useForm from 'hooks/useForm';
import { useNavigate } from 'react-router';

import ColumnLabeledParagraph from '../molecules/ColumnLabeledParagraph';
import LabeledTextarea from '../molecules/LabeledTextarea';
import GuestButton from '../atoms/GuestButton';
import LabeledInput from '../molecules/LabeledInput';

type UserEditFormInitialValues = {
  PK: string;
  SK: string;
  userId: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  message: string;
  allergy: string;
  isAttending: boolean;
};

type Props = {
  formInitialValues: UserEditFormInitialValues;
  onSubmit: (formInput: IUpdateUserRequest) => void;
};

const YourReplyEditForm: React.FC<Props> = ({
  formInitialValues,
  onSubmit,
}) => {
  const { values, inputChangeHandler } = useForm(formInitialValues);
  const navigate = useNavigate();

  const { firstName, lastName, isAttending, message, allergy } = values;

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    onSubmit({
      firstName: firstName as string,
      lastName: lastName as string,
      isAttending: isAttending as boolean,
      allergy: allergy as string,
      message: message as string,
    });
  };

  return (
    <div className="w-full flex flex-col py-5 px-0 sm:px-10 gap-6">
      <div className="grid grid-cols-2 auto-cols-fr justify-items-center gap-4">
        <div className="w-full">
          <LabeledInput
            label="First Name"
            name="firstName"
            type="text"
            value={firstName as string}
            onChange={inputChangeHandler}
            inputStyle="InputLighter text-Green-dark"
            labelStyle="text-Yellow-dark"
          />
        </div>
        <div className="w-full">
          <LabeledInput
            label="Last Name"
            name="lastName"
            type="text"
            value={lastName as string}
            onChange={inputChangeHandler}
            inputStyle="InputLighter text-Green-dark"
            labelStyle="text-Yellow-dark"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 auto-cols-fr justify-items-center gap-4">
        <p className="mb-2 md:mb-0 form-check form-check-inline">
          <input
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            className="form-check-input appearance-none h-4 w-4 border border-Yellow-dark rounded-sm checked:bg-Yellow-dark focus:outline-none transition duration-200 mt-1 float-left mr-1 cursor-pointer"
            checked={isAttending as boolean}
          />
          <label className="text-Yellow-dark">accepts with pleasure</label>
        </p>
        <p className="mb-2 md:mb-0 form-check form-check-inline">
          <input
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            className="form-check-input appearance-none h-4 w-4 border border-Yellow-dark rounded-sm checked:bg-Yellow-dark focus:outline-none transition duration-200 mt-1 float-left mr-1 cursor-pointer"
            checked={isAttending as boolean}
          />
          <label className="text-Yellow-dark">declines with regret</label>
        </p>
      </div>
      <LabeledTextarea
        label="Message"
        name="message"
        className="InputLighter text-Green-dark"
        rows={7}
        value={message as string}
        onChange={inputChangeHandler}
      />
      <LabeledTextarea
        label="If you have food allergy"
        name="allergy"
        className="InputLighter text-Green-dark"
        rows={4}
        value={allergy as string}
        onChange={inputChangeHandler}
      />
      <div className="grid grid-cols-2 justify-items-center">
        <GuestButton
          className="BaseButtonStyle border border-white text-white drop-shadow-lg w-48 mx-auto"
          type="button"
          onClick={submitHandler}
        >
          Update your reply
        </GuestButton>
        <GuestButton
          className="BaseButtonStyle border border-white text-white drop-shadow-lg w-48 mx-auto"
          type="button"
          onClick={() => navigate('/guests/mypage')}
        >
          Cancel
        </GuestButton>
      </div>
    </div>
  );
};

export default YourReplyEditForm;
