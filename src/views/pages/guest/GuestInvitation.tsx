import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hooks';
import { useParams } from 'react-router';
import { createAttendanceData, signupGuest } from 'redux/userThunkSlice';

import GuestInvitationLayout from 'views/components/molecules/Layout/GuestInvitationLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import FormAttendance from 'views/components/organisms/FormAttendance';

const GuestInvitation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const params = useParams();
  const eventId = params.eventId!;

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    message: '',
    allergy: '',
    isAttending: false,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    message,
    allergy,
    isAttending,
  } = formState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange');
    console.log('e.target.name', e.target.name);
    console.log('e.target.value', e.target.value);

    if (e.target.value === 'true') {
      return setFormState((prev) => ({
        ...prev,
        [e.target.name]: true,
      }));
    } else if (e.target.value === 'false') {
      return setFormState((prev) => ({
        ...prev,
        [e.target.name]: false,
      }));
    }

    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const signUpResult = await dispatch(
        signupGuest({
          firstName,
          lastName,
          email,
          password,
          message,
          allergy,
          isAttending,
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
          attendanceReqBody: { userId, isAttending },
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

  return (
    <GuestInvitationLayout
      bgClassName="w-full pt-20 FlexCenter flex-col bg-gradient-to-t from-Green-default to-White-darker md:min-h-screen relative"
      copyrightClassName="text-Pink-dark mb-5"
    >
      <div className="w-5/6 lg:w-4/5 my-8 md:h-4/5 bg-white FlexCenter rounded-2xl p-8 flex flex-col md:items-center lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <CardWeddingInfo spacing="" />
        </div>
        <div className="lg:w-1/2">
          {/* FIXME: high */}
          <FormAttendance
            sectionTitle="RSVP"
            sectionTitleColor="text-Yellow-dark"
            classInput="InputDark"
            textButton="Reply"
            textButtonCancel=""
            styleButton="bg-Green-default text-white"
            styleButtonCancel="hidden"
            spacing="md:w-extraLarge"
            firstName={firstName}
            lastName={lastName}
            message={message}
            allergy={allergy}
            email={email}
            password={password}
            disabledInput={false}
            disabledDesc={false}
            submitHandler={submitHandler}
            typeButton="submit"
            isAttending={isAttending}
            onClickButton={() => null}
            onChangeFirstName={handleChange}
            onChangeLastName={handleChange}
            onChangeEmail={handleChange}
            onChangePassword={handleChange}
            onChangeMessage={handleChange}
            onChangeAllergy={handleChange}
            onInputChange={handleChange}
            onClickCancel={() => {
              navigate('/guests');
            }}
          />
        </div>
      </div>
    </GuestInvitationLayout>
  );
};

export default GuestInvitation;
