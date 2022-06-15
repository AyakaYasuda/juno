import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signupAction } from 'RTK/features/auth/authSliceThunk';

import ImgFlower1 from 'views/images/invitation-flower1.png';
import ImgFlower2 from 'views/images/invitation-flower2.png';

import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import CardWeddingInfo from 'views/components/Guest/CardWeddingInfo';
import FormAttendance from 'views/components/Guest/FormAttendance';

type GuestInvitationLayoutProps = {
  // children: React.ReactNode;
};

const GuestInvitationLayout: React.FC<GuestInvitationLayoutProps> = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    message: '',
    allergy: '',
  });

  const { firstName, lastName, email, password, message, allergy } = formState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((state) => state.auth.status);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        signupAction({
          firstName,
          lastName,
          email,
          password,
          message,
          allergy,
          isAdmin: false,
        })
      );
      // signup success
      if (signupAction.fulfilled.match(result)) {
        alert('signup successfuly!');
        navigate('/guests/login');
      }

      // signup failed
      if (signupAction.rejected.match(result)) {
        alert('signup failed...');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   await axios.post(
  //     'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/signup',
  //     JSON.stringify({
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       message,
  //       allergy,
  //       isAdmin: false,
  //     })
  //   );

  //   navigate('/guests/login');

  //   console.log('submitted!');
  // };

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
              <FormAttendance
                sectionTitle="RSVP"
                sectionTitleColor="text-Yellow-dark"
                classInput="InputDark"
                textButton="Reply"
                styleButton="bg-Green-default text-white"
                spacing="md:w-extraLarge"
                firstName={firstName}
                lastName={lastName}
                message={message}
                allergy={allergy}
                email={email}
                password={password}
                submitHandler={submitHandler}
                onChangeFirstName={handleChange}
                onChangeLastName={handleChange}
                onChangeEmail={handleChange}
                onChangePassword={handleChange}
                onChangeMessage={handleChange}
                onChangeAllergy={handleChange}
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
