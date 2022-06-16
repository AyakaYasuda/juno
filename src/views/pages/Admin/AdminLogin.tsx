import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'app/hooks';
import { login } from 'features/auth/authThunkSlice';

import Form from 'views/components/atomic/molecules/Form';
import TopLayout from 'views/components/atomic/templates/TopLayout';

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await dispatch(
      login({
        email,
        password,
      })
    );
    console.log(result);

    // login success
    if (login.fulfilled.match(result)) {
      alert('login successfuly!');
      navigate('/admin/create');
    }
    // login failed
    if (login.rejected.match(result)) {
      alert('login failed...');
    }
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
          className="InputBorder mb-16"
        />
        <label className="text-Pink-default">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="InputBorder mb-20"
        />
      </Form>
    </TopLayout>
  );
}

export default AdminLogin;
