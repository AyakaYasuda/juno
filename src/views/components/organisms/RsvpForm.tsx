import React from 'react';
import useForm from 'hooks/useForm';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'hooks/hooks';

import { signupGuest, createAttendanceData } from 'redux/userThunkSlice';

import LabeledInput from '../molecules/LabeledInput';
import Checker from '../atoms/Checker';
import LabeledTextarea from '../molecules/LabeledTextarea';
import GreenButton from '../atoms/GreenButton';

const formInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  message: '',
  allergy: '',
  isAttending: false,
};

type Props = {
  eventId: string;
};

const RsvpForm: React.FC<Props> = ({ eventId }) => {
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
        signupGuest({
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
      if (signupGuest.fulfilled.match(signUpResult)) {
        console.log('signUp successfully!');
      }

      // signUp failed
      if (signupGuest.rejected.match(signUpResult)) {
        alert('signup failed...');
      }

      const userId = signUpResult.payload.userId;

      const createAttendanceDataResult = await dispatch(
        createAttendanceData({
          eventId,
          attendanceReqBody: { userId, isAttending: isAttending as boolean },
        })
      );

      // success
      if (createAttendanceData.fulfilled.match(createAttendanceDataResult)) {
        alert('create attendance data successfully!');
        navigate('/guests/login');
      }

      //  failed
      if (createAttendanceData.rejected.match(createAttendanceDataResult)) {
        alert('create attendance data failed...');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => {};

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="FlexCenter flex-col md:flex-row md:gap-6">
          <LabeledInput
            label="First Name"
            name="firstName"
            type="text"
            value={firstName as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="text-Yellow-dark"
          />
          <LabeledInput
            label="Last Name"
            name="lastName"
            type="text"
            value={lastName as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="text-Yellow-dark"
          />
        </div>
        <div className="FlexJustify flex-col md:flex-row  items-center md:items-start md:w-96 md:gap-8">
          <Checker
            labelChecker="accepts with pleasure"
            valueChecker={true}
            containerChecker="gap-1 items-center"
            classChecker="hidden mr-1"
            typeChecker="radio"
            name="isAttending"
            onChange={inputChangeHandler}
            isChecked={isAttending as boolean}
          />
          <Checker
            labelChecker="declines with regret"
            valueChecker={false}
            containerChecker="gap-1 items-center"
            classChecker="hidden mr-1"
            typeChecker="radio"
            name="isAttending"
            onChange={inputChangeHandler}
            isChecked={!isAttending as boolean}
          />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <LabeledTextarea
            className="InputDark"
            label="Message"
            name="message"
            value={message as string}
            rows={3}
            onChange={inputChangeHandler}
          />
          <LabeledTextarea
            className="InputDark"
            label="If you have food allergy"
            name="allergy"
            value={allergy as string}
            rows={2}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="FlexCenter flex-col md:flex-row md:gap-6">
          <LabeledInput
            label="Email"
            name="email"
            type="email"
            value={email as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="text-Yellow-dark"
          />
          <LabeledInput
            label="Password"
            name="password"
            type="password"
            value={password as string}
            onChange={inputChangeHandler}
            inputStyle="InputDark"
            labelStyle="text-Yellow-dark"
          />
        </div>

        <div className={`flex justify-center md:w-extraLarge gap-12 `}>
          <GreenButton type="submit" className="bg-Green-default text-white">
            Reply
          </GreenButton>
          <GreenButton type="button" onClick={cancelHandler} className="hidden">
            Cancel
          </GreenButton>
        </div>
      </form>
    </div>
  );
};

export default RsvpForm;
