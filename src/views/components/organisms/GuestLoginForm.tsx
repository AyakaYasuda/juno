import React from 'react';
import { useAppDispatch } from 'hooks/hooks';
import { useNavigate } from 'react-router';
import useForm from 'hooks/useForm';
import { login } from 'redux/authSlice';
import { SessionKeys } from 'constants/sessionKeys';
import SessionServices from 'services/session.services';
import { Form } from '../atoms/Form';
import LabeledInput from '../molecules/LabeledInput';
import GuestButton from '../atoms/GuestButton';

const initialFormState = {
  email: 'ayaka@test.com',
  password: 'ayakayasuda',
};

const GuestLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { values, inputChangeHandler } = useForm(initialFormState);
  const { email, password } = values;

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await dispatch(
      login({
        email: email as string,
        password: password as string,
      })
    );

    // login success
    if (login.fulfilled.match(result)) {
      alert('login successfully!');

      SessionServices.setTokenWithExpirationDate(result.payload.token);
      SessionServices.setUserId(result.payload.userId);

      navigate('/guests/mypage');
    }

    // login failed
    if (login.rejected.match(result)) {
      alert('login failed...');
    }
  };

  return (
    <Form
      className="flex flex-col mt-16 mb-8 w-full px-8"
      onSubmit={submitHandler}
    >
      <LabeledInput
        type="email"
        name="email"
        label="Email"
        value={email as string}
        onChange={inputChangeHandler}
        labelStyle="text-white text-left"
        inputStyle="InputBorder mb-16 border-white text-white"
      />
      <LabeledInput
        type="password"
        name="password"
        label="Password"
        value={password as string}
        onChange={inputChangeHandler}
        labelStyle="text-white text-left"
        inputStyle="InputBorder mb-20 border-white text-white"
      />
      <div className="w-3/4 mx-auto pt-4 text-Pink-default text-center">
        <GuestButton
          className="BaseButtonStyle bg-Green-default text-white"
          type="submit"
        >
          Log In
        </GuestButton>
      </div>
    </Form>
  );
};

export default GuestLoginForm;
