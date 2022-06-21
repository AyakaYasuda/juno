import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

import SessionServices from 'services/session.services';

import { SessionKeys } from 'constants/sessionKeys';
import { getUser } from 'redux/userThunkSlice';

import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo/index';
import FormAttendance from 'views/components/Guest/FormAttendance';
import Title from 'views/components/atoms/Title';
import Navbar from 'views/components/atomic/molecules/Navbar';

const GuestMyPageLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    firstName,
    lastName,
    email,
    password,
    message,
    allergy,
    isAttending,
  } = useAppSelector((state) => state.user.user);

  const handleOnClick = () => {
    navigate('/guests/edit');
  };

  useEffect(() => {
    const userId = SessionServices.getItem(SessionKeys.USER_ID);

    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch]);

  // Yellow-dark
  return (
    <GuestBaseLayout>
      <Navbar bgColor="Yellow-dark" link={<></>} redirectPath="/guests/login" />
      <div className="flex flex-col w-screen h-full md:h-screen mb-8">
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
              textButtonCancel=""
              styleButton="buttonWhite"
              styleButtonCancel="hidden"
              spacing="md:w-large"
              firstName={firstName}
              lastName={lastName}
              message={message}
              allergy={allergy}
              email={email}
              password={password}
              disabledInput={true}
              disabledDesc={false}
              typeButton="button"
              isAttending={isAttending}
              onClickButton={handleOnClick}
              // FIXME: change handlers to optional
              // reason: no handler for show data page
              submitHandler={() => null}
              onChangeFirstName={() => null}
              onChangeLastName={() => null}
              onChangeEmail={() => null}
              onChangePassword={() => null}
              onChangeMessage={() => null}
              onChangeAllergy={() => null}
              onInputChange={() => null}
              onClickCancel={() => null}
            />
          </div>
        </div>
      </div>
    </GuestBaseLayout>
  );
};

export default GuestMyPageLayout;
