import React from 'react';
import { IUpdateUserRequest } from 'types/UserData.type';
import useForm from 'hooks/useForm';
import { useNavigate } from 'react-router';

import LabeledTextarea from '../molecules/LabeledTextarea';
import GuestButton from '../atoms/GuestButton';
import LabeledInput from '../molecules/LabeledInput';
import Checker from '../atoms/Checker';

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
  console.log('isAttending: ', isAttending);

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
    <div className="w-full flex flex-col px-0 sm:px-10 gap-6">
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
        <Checker
          label="accepts with pleasure"
          value={true}
          className="gap-1 items-center"
          inputType="radio"
          name="isAttending"
          isChecked={isAttending as boolean}
          onChange={inputChangeHandler}
        />
        <Checker
          label="declines with regret"
          value={false}
          className="gap-1 items-center"
          inputType="radio"
          name="isAttending"
          isChecked={!isAttending as boolean}
          onChange={inputChangeHandler}
        />
      </div>
      <LabeledTextarea
        label="Message"
        name="message"
        className="InputLighter text-Green-dark"
        rows={4}
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
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4">
        <GuestButton
          className="BaseButtonStyle border border-white text-white drop-shadow-lg mx-auto"
          type="button"
          onClick={submitHandler}
        >
          Update your reply
        </GuestButton>
        <GuestButton
          className="BaseButtonStyle border border-white text-white drop-shadow-lg mx-auto"
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
