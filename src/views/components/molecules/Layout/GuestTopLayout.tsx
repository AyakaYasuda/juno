import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hooks';
import { login } from 'redux/userThunkSlice';

import Logo from 'views/components/atoms/Logo';
import Input from 'views/components/atoms/Input';
import DeleteMeCopyright from 'views/components/atoms/DeleteMeCopyright';
import GuestButton from 'views/components/atoms/GuestButton';
import SessionServices from 'services/session.services';
import { SessionKeys } from 'constants/sessionKeys';

// import ImageTop from 'views/images/guest-top.png';
import ImageTop from '../../../../assets/images/guest-top.png';

const GuestTopLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await dispatch(
      login({
        email,
        password,
      })
    );
    console.log('login result', result);

    // login success
    if (login.fulfilled.match(result)) {
      alert('login successfully!');

      SessionServices.setItem(SessionKeys.TOKEN, result.payload.token);
      SessionServices.setItem(SessionKeys.USER_ID, result.payload.userId);

      navigate('/guests/mypage');
    }
    // login failed
    if (login.rejected.match(result)) {
      alert('login failed...');
    }
  };

  return (
    <div className="w-full h-screen relative">
      <img
        className="w-full h-full object-cover"
        src={ImageTop}
        alt="Guest Top"
      />
      <div className="absolute inset-16 md:inset-32 text-center md:text-left">
        <Logo />

        <div className="flex flex-col mt-4 gap-8">
          <h3 className="text-white">Guests Log In</h3>
          <form
            action="/guests"
            method="post"
            onSubmit={submitHandler}
            className="flex flex-col text-left mb-8"
          >
            <Input
              type="email"
              containerInput="flex flex-col items-start"
              valueInput={email}
              classInput="bg-transparent border-b border-White-light w-full md:w-2/5"
              labelName="Email"
              inputName="email"
              labelColor="text-White-light"
              disabledInput={false}
              onChangeHandler={handleChange}
            />
            <Input
              type="password"
              containerInput="flex flex-col items-start"
              valueInput={password}
              classInput="bg-transparent border-b border-White-light w-full md:w-2/5"
              labelName="Password"
              inputName="password"
              labelColor="text-White-light"
              disabledInput={false}
              onChangeHandler={handleChange}
            />
            <div className="FlexJustifyCenter md:flex md:justify-start md: mt-6">
              <GuestButton
                type="submit"
                onClick={() => null}
                className="bg-Green-default text-white w-2/5"
              >
                Login
              </GuestButton>
            </div>
          </form>
        </div>
      </div>

      <DeleteMeCopyright textColor="text-white" />
    </div>
  );
};

export default GuestTopLayout;
