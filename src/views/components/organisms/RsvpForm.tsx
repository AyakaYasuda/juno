import React from 'react';
import useForm from 'hooks/useForm';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'hooks/hooks';

import { createAttendanceData } from 'redux/guestUserSlice';
import { signup } from 'redux/guestAuthSlice';

import LabeledInput from '../molecules/LabeledInput';
import Checker from '../atoms/Checker';
import LabeledTextarea from '../molecules/LabeledTextarea';
import GuestButton from '../atoms/GuestButton';
import SessionServices from 'services/session.services';
import { Link } from 'react-router-dom';

const formInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  message: '',
  allergy: '',
  isAttending: true,
};

type Props = {
  eventId: string;
  onShowModal: () => void;
  // FIXME: make sure this is necessary to pass
  createAttendanceError: string[];
};

const RsvpForm: React.FC<Props> = ({
  eventId,
  onShowModal,
  createAttendanceError,
}) => {
  const { values, inputChangeHandler } = useForm(formInitialValues);
  const {
    firstName,
    lastName,
    email,
    password,
    message,
    allergy,
    isAttending,
  } = values;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const signUpResult = await dispatch(
        signup({
          firstName: firstName as string,
          lastName: lastName as string,
          email: email as string,
          password: password as string,
          message: message as string,
          allergy: allergy as string,
          isAttending: isAttending as boolean,
          isAdmin: false,
        })
      );

      // signup success
      if (signup.fulfilled.match(signUpResult)) {
        SessionServices.setGuestTokenWithExpirationDate(
          signUpResult.payload.token
        );
        SessionServices.setGuestUserId(signUpResult.payload.userId);

        const userId = signUpResult.payload.userId;

        const createAttendanceDataResult = await dispatch(
          createAttendanceData({
            eventId,
            attendanceReqBody: { userId, isAttending: isAttending as boolean },
          })
        );

        // success
        if (createAttendanceData.fulfilled.match(createAttendanceDataResult)) {
          navigate(`/guests/events/${eventId}/login`);
        }

        //  failed
        if (createAttendanceData.rejected.match(createAttendanceDataResult)) {
          console.log(
            'failed to create attendance data: ',
            createAttendanceError
          );
        }
      }

      // signUp failed
      if (signup.rejected.match(signUpResult)) {
        onShowModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full px-10">
      <h2 className="text-Yellow-dark mb-4 text-center lg:text-start">RSVP</h2>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-4">
          <LabeledInput
            label="First Name"
            name="firstName"
            type="text"
            value={firstName as string}
            onChange={inputChangeHandler}
            inputStyle="GuestInputDark"
            labelStyle="text-Yellow-dark"
          />
          <LabeledInput
            label="Last Name"
            name="lastName"
            type="text"
            value={lastName as string}
            onChange={inputChangeHandler}
            inputStyle="GuestInputDark"
            labelStyle="text-Yellow-dark"
          />
        </div>
        <div className="grid grid-cols-1 gap-0 justify-items-center md:grid-cols-2 md:gap-4 md:justify-items-center mt-2 mb-4">
          <Checker
            label="accepts with pleasure"
            value={true}
            className="gap-1 items-center"
            labelStyle="cursor-pointer"
            inputType="radio"
            name="isAttending"
            onChange={inputChangeHandler}
            isChecked={isAttending as boolean}
          />
          <Checker
            label="declines with regret"
            value={false}
            className="gap-1 items-center"
            labelStyle="cursor-pointer"
            inputType="radio"
            name="isAttending"
            onChange={inputChangeHandler}
            isChecked={!isAttending as boolean}
          />
        </div>
        <div className="flexCenter flex-col">
          <LabeledTextarea
            className="GuestInputDark"
            label="Message"
            name="message"
            value={message as string}
            rows={3}
            onChange={inputChangeHandler}
          />
          <LabeledTextarea
            className="GuestInputDark"
            label="If you have food allergy"
            name="allergy"
            value={allergy as string}
            rows={2}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-4">
          <LabeledInput
            label="Email"
            name="email"
            type="email"
            value={email as string}
            onChange={inputChangeHandler}
            inputStyle="GuestInputDark"
            labelStyle="text-Yellow-dark"
          />
          <LabeledInput
            label="Password"
            name="password"
            type="password"
            value={password as string}
            onChange={inputChangeHandler}
            inputStyle="GuestInputDark"
            labelStyle="text-Yellow-dark"
          />
        </div>

        <div className="text-center">
          <GuestButton type="submit" className="bg-Green-default text-white">
            Reply
          </GuestButton>
        </div>

        <p className="text-center text-Yellow-dark mt-10 mb-0">
          <Link to={`/guests/events/${eventId}/login`}>
            You've already replied? Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RsvpForm;
