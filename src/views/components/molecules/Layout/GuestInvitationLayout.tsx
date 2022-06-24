import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hooks';
import { useParams } from 'react-router';
import { createAttendanceData, signupGuest } from 'redux/userThunkSlice';

import ImgFlower1 from '../../../../assets/images/invitation-flower1.png';
import ImgFlower2 from '../../../../assets/images/invitation-flower2.png';

import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import GuestBaseLayout from './GuestBaseLayout';
import FormAttendance from '../../organisms/FormAttendance';

type GuestInvitationLayoutProps = {
  // children: React.ReactNode;
};

const GuestInvitationLayout: React.FC<GuestInvitationLayoutProps> = () => {
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

      console.log('signUpResult', signUpResult);
      const userId = signUpResult.payload.userId;

      const createAttendanceDataResult = await dispatch(
        createAttendanceData({
          eventId,
          attendanceReqBody: { userId, isAttending },
        })
      );
      console.log('createAttendanceDataResult', createAttendanceDataResult);

      // success
      if (createAttendanceData.fulfilled.match(createAttendanceDataResult)) {
        alert('create attendance data successfully!');
        navigate('/guests/login');
      }

      //  failed
      if (createAttendanceData.rejected.match(createAttendanceDataResult)) {
        alert('create attendance data failed...');
      }

      console.log('submitHandler end');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GuestBaseLayout>
      <div className="flex justify-center md:items-center">
        <img
          src={ImgFlower1}
          alt="flower"
          className="w-medium fixed top-0 right-0"
        />
        <div className="w-5/6 lg:w-4/5 my-8 md:h-4/5 bg-white FlexCenter rounded-2xl">
          <div className=" w-11/12 md:h-5/6 my-6 flex flex-col md:items-center lg:flex-row gap-8">
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
        </div>

        <img
          src={ImgFlower2}
          alt="flower"
          className="w-1/4 fixed bottom-0 left-0"
        />
      </div>
    </GuestBaseLayout>
  );
};

export default GuestInvitationLayout;
