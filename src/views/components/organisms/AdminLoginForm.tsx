import { SessionKeys } from 'constants/sessionKeys';
import { useAppDispatch } from 'hooks/hooks';
import useForm from 'hooks/useForm';
import React from 'react';
import { useNavigate } from 'react-router';
import { login } from 'redux/userThunkSlice';
import SessionServices from 'services/session.services';
import Form from '../molecules/Form';

const initialFormState = {
  email: '',
  password: '',
};

const AdminLoginForm = () => {
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
    console.log(result);

    // login success
    if (login.fulfilled.match(result)) {
      alert('login successfully!');
      SessionServices.setItem(SessionKeys.TOKEN, result.payload.token);
      SessionServices.setItem(SessionKeys.USER_ID, result.payload.userId);
      navigate('/admin/create');
    }
    // login failed
    if (login.rejected.match(result)) {
      alert('login failed...');
    }
  };
  return (
    <Form
      ctaText="Log In"
      linkText="You don’t have an account yet?"
      params="/admin/register"
      submitHandler={submitHandler}
    >
      <label className="pt-8 text-Pink-default">Email</label>
      <input
        type="email"
        name="email"
        value={email as string}
        onChange={inputChangeHandler}
        className="InputBorder mb-16"
      />
      <label className="text-Pink-default">Password</label>
      <input
        type="password"
        name="password"
        value={password as string}
        onChange={inputChangeHandler}
        className="InputBorder mb-20"
      />
    </Form>
  );
};

export default AdminLoginForm;
