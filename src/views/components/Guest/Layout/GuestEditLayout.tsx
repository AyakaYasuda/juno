import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import Title from 'views/components/atomic/atoms/Title';
import CardWeddingInfo from 'views/components/Guest/CardWeddingInfo/index';
import FormAttendance from 'views/components/Guest/FormAttendance';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { RootState } from 'app/store';
import { editUser } from 'features/user/userThunkSlice';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  message: string;
  allergy: string;
  isAttending: boolean;
}

const GuestEditLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userState = useAppSelector((state: RootState) => state.user.user);

  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    message: '',
    allergy: '',
    isAttending: false,
  });

  const initForm = useCallback(() => {
    const initialFormState: FormState = {
      firstName: userState.firstName,
      lastName: userState.lastName,
      email: userState.email,
      password: userState.password,
      message: userState.message,
      allergy: userState.allergy,
      isAttending: userState.isAttending,
    };

    setFormState(initialFormState);
  }, [setFormState, userState]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === 'true'
        ? true
        : e.target.value === 'false'
        ? false
        : e.target.value;

    setFormState((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const submitHandler = async (e: SubmitEvent) => {
    console.log('GuestEditLayout submitHandler');
    e.preventDefault();

    if (formState) {
      const {
        firstName,
        lastName,
        email,
        password,
        message,
        allergy,
        isAttending,
      } = formState;

      await dispatch(
        editUser({
          firstName,
          lastName,
          email,
          password,
          message,
          allergy,
          isAttending,
        })
      );

      navigate('/guests/mypage');
    }
  };

  const onClickCancel = () => {
    navigate('/guests/mypage');
  };

  useEffect(() => {
    initForm();
  }, [userState, initForm]);

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

          <div className="w-full">
            <FormAttendance
              sectionTitleColor="text-white"
              sectionTitle="Your Reply"
              classInput="InputLight"
              textButton="Update your reply"
              textButtonCancel="Cancel"
              styleButton="buttonWhite"
              styleButtonCancel="buttonWhite"
              spacing="md:w-3/5"
              firstName={formState && formState.firstName}
              lastName={formState && formState.lastName}
              message={formState && formState.message}
              allergy={formState && formState.allergy}
              email={formState && formState.email}
              password={formState && formState.password}
              disabledInput={false}
              disabledDesc={false}
              isAttending={formState && formState.isAttending}
              onClickButton={() => {}}
              submitHandler={submitHandler}
              typeButton="submit"
              onChangeFirstName={handleChange}
              onChangeLastName={handleChange}
              onChangeEmail={handleChange}
              onChangePassword={handleChange}
              onChangeMessage={handleChange}
              onChangeAllergy={handleChange}
              onInputChange={handleChange}
              onClickCancel={onClickCancel}
            />
          </div>
        </div>
      </div>
    </GuestBaseLayout>
  );
};

export default GuestEditLayout;
