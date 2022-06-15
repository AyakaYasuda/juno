import React, { useState, SyntheticEvent } from 'react';
import TopLayout from 'views/components/atomic/templates/TopLayout';
import Form from 'views/components/atomic/molecules/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminRegister() {
  const navigate = useNavigate();
  const [firstName, setFirstNamne] = useState('');
  const [lastName, setLastNamne] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    // interact with the backend using fetch
    // await fetch(
    //   'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/signup',
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       firstName,
    //       lastName,
    //       email,
    //       password,
    //       isAdmin: true,
    //       messsage: '',
    //       allergy: '',
    //     }),
    //   }
    // );

    await axios.post(
      'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/signup',
      JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        isAdmin: true,
        messsage: '',
        allergy: '',
      })
    );

    navigate('/admin/login');

    console.log('submitted!');
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
          value={firstName}
          onChange={(e) => setFirstNamne(e.target.value)}
          className="InputBorder"
        />
        <label className="text-Pink-default">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastNamne(e.target.value)}
          className="InputBorder"
        />
        <label className="text-Pink-default">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="InputBorder"
        />
        <label className="text-Pink-default">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="InputBorder"
        />
      </Form>
    </TopLayout>
  );
}

export default AdminRegister;
