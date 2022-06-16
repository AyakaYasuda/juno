import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getUser } from 'features/user/userThunkSlice';

import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import Title from 'views/components/atomic/atoms/Title';
import CardWeddingInfo from 'views/components/Guest/CardWeddingInfo/index';
import FormAttendance from 'views/components/Guest/FormAttendance';

const GuestMyPageLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const DAMMY_USERID = '61c71824-2445-4127-965c-aa8f5ae4fabe';

  useEffect(() => {
    dispatch(getUser(DAMMY_USERID));
  }, []);

  const {
    firstName,
    lastName,
    email,
    password,
    message,
    allergy,
    isAttending,
  } = useAppSelector((state) => state.user.user);

  return (
    <GuestBaseLayout>
      <div className="flex flex-col w-screen h-full md:h-screen mb-8">
        <div className="flex justify-between">
          <Title classTitle="" textColor="text-Yellow-dark">
            Juno
          </Title>
          <button className="text-Yellow-dark">Logout</button>
        </div>
        <div className="flex flex-col md:flex-row md:justify-center md:items-center md:h-screen">
          <div className="flex flex-col items-center">
            <Title classTitle="" textColor="text-white">
              Event Info
            </Title>
            <CardWeddingInfo spacing="mx-4 p-4 md:w-3/4 md:p-10" />
          </div>

          <div className="w-full ">
            <FormAttendance
              sectionTitleColor="text-white"
              sectionTitle="Your Reply"
              classInput="InputDisabled"
              textButton="Edit your reply"
              styleButton="buttonWhite"
              spacing="md:w-11/12"
              firstName={firstName}
              lastName={lastName}
              message={message}
              allergy={allergy}
              email={email}
              password={password}
              disabledInput={true}
              disabledDesc={false}
              submitHandler={() => null}
              onChangeFirstName={() => null}
              onChangeLastName={() => null}
              onChangeEmail={() => null}
              onChangePassword={() => null}
              onChangeMessage={() => null}
              onChangeAllergy={() => null}
            />
          </div>
        </div>
      </div>
    </GuestBaseLayout>
  );
};

export default GuestMyPageLayout;
