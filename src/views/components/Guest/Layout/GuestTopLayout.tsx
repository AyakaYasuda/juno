import React from 'react';

import Logo from 'views/components/atomic/atoms/Logo';
import Input from 'views/components/atomic/atoms/Input';
import ImageTop from 'views/images/guest-top.png';
import Copyright from 'views/components/atomic/atoms/Copyright';
import ButtonFlexible from 'views/components/atomic/atoms/ButtonFlexible';

const GuestTopLayout = () => {
  return (
    <div className="w-full h-screen relative">
      <img
        className="w-full h-full object-cover"
        // className="w-full h-full bg-guest-top"
        src={ImageTop}
        alt="Guest Top"
      />
      <div className="absolute inset-16 md:inset-4 text-center md:text-left">
        <Logo />
        <h3 className="text-white">Guests Log In</h3>
        <div className="flex flex-col justify-between h-1/2 mt-4">
          <Input
            containerInput="flex flex-col items-start"
            valueInput=""
            classInput="bg-transparent border-b border-White-light w-full"
            labelName="Email"
            inputName="Email"
            labelColor="text-White-light"
          />
          <Input
            containerInput="flex flex-col items-start"
            valueInput=""
            classInput="bg-transparent border-b border-White-light w-full"
            labelName="Password"
            inputName="Password"
            labelColor="text-White-light"
          />
          <div className="FlexJustify">
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
