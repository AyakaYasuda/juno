import React, { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Logo from 'views/components/atomic/atoms/Logo';
import Input from 'views/components/atomic/atoms/Input';
import ImageTop from 'views/images/guest-top.png';
import Copyright from 'views/components/atomic/atoms/Copyright';
import ButtonFlexible from 'views/components/atomic/atoms/ButtonFlexible';
import { FetchData } from 'RTK/features/fetchData/FetchData';

const GuestTopLayout = () => {
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
        email,
        password,
        isAdmin: false,
      })
    );
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
        <FetchData />

        <div className="flex flex-col mt-4 gap-8">
          <h3 className="text-white">Guests Log In</h3>
          <Input
            containerInput="flex flex-col items-start"
            valueInput=""
            classInput="bg-transparent border-b border-White-light w-full md:w-2/5"
            labelName="Email"
            inputName="Email"
            labelColor="text-White-light"
            onChangeHandler={(e) => setEmail(e.target.value)}
          />
          <Input
            containerInput="flex flex-col items-start"
            valueInput=""
            classInput="bg-transparent border-b border-White-light w-full md:w-2/5"
            labelName="Password"
            inputName="Password"
            labelColor="text-White-light"
            onChangeHandler={(e) => setPassword(e.target.value)}
          />
          <div className="FlexJustify md:flex md:justify-start">
            <ButtonFlexible styleButton="bg-Green-default text-white w-2/5">
              Login
            </ButtonFlexible>
          </div>
        </div>
      </div>

      <Copyright textColor="text-white" />
    </div>
  );
};

export default GuestTopLayout;
