import React from 'react';
import { useAppDispatch } from 'hooks/hooks';
import { useNavigate } from 'react-router';
import useForm from 'hooks/useForm';
import { Link } from 'react-router-dom';
import { login } from 'redux/adminAuthSlice';
import SessionServices from 'services/session.services';

import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { Form } from '../atoms/Form';
import LabeledInput from '../molecules/LabeledInput';

type Props = {
  onShowModal: () => void;
};

const initialFormState = {
  email: '',
  password: '',
};

const AdminLoginForm: React.FC<Props> = ({ onShowModal }) => {
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
      const { userId, token } = result.payload;

      SessionServices.setAdminTokenWithExpirationDate(token);
      SessionServices.setAdminUserId(userId);

      navigate('/admin/create');
    }

    // login failed
    if (login.rejected.match(result)) {
      onShowModal();
    }
  };

  return (
    <Card className="opacity-90">
      <Form
        className="flex flex-col text-left mb-8 w-full md:w-4/5 mx-auto pt-12"
        onSubmit={submitHandler}
      >
        <LabeledInput
          type="email"
          name="email"
          label="Email"
          value={email as string}
          onChange={inputChangeHandler}
          labelStyle="text-Pink-default"
          inputStyle="InputBorder mb-16"
        />
        <LabeledInput
          type="password"
          name="password"
          label="Password"
          value={password as string}
          onChange={inputChangeHandler}
          labelStyle="text-Pink-default"
          inputStyle="InputBorder mb-20"
        />
        <div className="w-3/4 mx-auto pt-4 text-Pink-default text-center">
          <Button customStyle="bg-Pink-default text-White-default mb-4">
            Log In
          </Button>
          <Link to={'/admin/register'}>You don't have an account yet?</Link>
        </div>
      </Form>
    </Card>
  );
};

export default AdminLoginForm;
