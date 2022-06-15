import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'app/hooks';
import { setCredentials } from '../../../features/auth/authSlice';

import { useLoginMutation } from 'app/services/authApi';
import { ILoginReq } from 'app/services/types';

import Form from 'views/components/atomic/molecules/Form';
import TopLayout from 'views/components/atomic/templates/TopLayout';
import axios from 'axios';

function AdminLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<ILoginReq>({
    email: '',
    password: '',
  });
  const { email, password } = formState;

  const [login] = useLoginMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    // [] は動的にキーをとってくるよ
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitHandler = async (e: any) => {
    e.preventDefault();

    // try {
    //   // const user = await login(formState).unwrap();
    //   // dispatch(setCredentials(user));
    //   const res = await axios.get(
    //     'https://jsonplaceholder.typicode.com/todos/10'
    //   );
    //   console.log('res', res);
    //   navigate('/admin/create');
    // } catch (error) {
    //   console.error(error);
    // }

    await axios.post(
      'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/login',
      JSON.stringify({
        email,
        password,
      })
    );

    navigate('/admin/create');
  };

  return (
    <TopLayout>
      <h2 className="mb-4">Welcome Back</h2>
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
          value={email}
          onChange={handleChange}
          // onChange={(e) => e.target.value}
          className="InputBorder mb-16"
        />
        <label className="text-Pink-default">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          // onChange={(e) => e.target.value}
          className="InputBorder mb-20"
        />
      </Form>
    </TopLayout>
  );
}

export default AdminLogin;
