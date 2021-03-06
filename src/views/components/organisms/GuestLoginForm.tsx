import React from 'react';
import { useAppDispatch } from 'hooks/hooks';
import { useNavigate } from 'react-router';
import useForm from 'hooks/useForm';
import { login } from 'redux/guestAuthSlice';
import SessionServices from 'services/session.services';
import { Form } from '../atoms/Form';
import LabeledInput from '../molecules/LabeledInput';
import GuestButton from '../atoms/GuestButton';
import { Link } from 'react-router-dom';

type Props = {
  onShowModal: () => void;
  eventId: string;
};

const initialFormState = {
  email: '',
  password: '',
};

const GuestLoginForm: React.FC<Props> = ({ onShowModal, eventId }) => {
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
      SessionServices.setGuestTokenWithExpirationDate(result.payload.token);
      SessionServices.setGuestUserId(result.payload.userId);

      navigate(`/guests/events/${eventId}/mypage`);
    }

    // login failed
    if (login.rejected.match(result)) {
      onShowModal();
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
      <Link className="text-white mt-5" to={`/guests/invitation/${eventId}`}>
        Do not have any account yet? Invitation
      </Link>
    </Form>
  );
};

export default GuestLoginForm;
