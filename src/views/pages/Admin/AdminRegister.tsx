import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { signup } from 'features/user/userThunkSlice';

import TopLayout from 'views/components/atomic/templates/TopLayout';
import Form from 'views/components/atomic/molecules/Form';

const AdminRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = formState;


  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await dispatch(
      signup({
        firstName,
        lastName,
        email,
        password,
        isAdmin: true,
      })
    );

    // signup success
    if (signup.fulfilled.match(result)) {
      alert('signup successfully!');
      navigate('/admin/login');
    }

    // signup failed
    if (signup.rejected.match(result)) {
      alert('signup failed...');
    }
  };

  return (
    <TopLayout>
      <h2 className="mb-4">Create your account</h2>
      <Form
        ctaText="Start Creating Invitations"
        linkText="You already have an account?"
        params="/admin/login"
        submitHandler={submitHandler}
      >
        <label className="text-Pink-default">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          className="InputBorder"
        />
        <label className="text-Pink-default">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          className="InputBorder"
        />
        <label className="text-Pink-default">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="InputBorder"
        />
        <label className="text-Pink-default">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="InputBorder"
        />
      </Form>
    </TopLayout>
  );
};

export default AdminRegister;
