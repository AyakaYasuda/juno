import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';
import GuestTopImg from '../../../../assets/images/guest-top.png';

type Props = {
  children?: React.ReactNode;
};

const GuestLoginLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <section className="w-full h-screen relative">
      <img
        className="w-full h-full object-cover"
        src={GuestTopImg}
        alt="Guest Top"
      />
      <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 md:left-40 md:-translate-x-0 md:w-96">
        {children}
      </div>
      <TempCopyright className="text-white bottom-4 absolute" />
    </section>
  );
};

export default GuestLoginLayout;
