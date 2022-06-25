import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';
import GuestTopImg from '../../../../assets/images/guest-top.png';

type Props = {
  children?: React.ReactNode;
};

const GuestLoginLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className="w-full h-screen relative">
      <img
        className="w-full h-full object-cover"
        src={GuestTopImg}
        alt="Guest Top"
      />
      <div className="absolute inset-1/2 left-0 text-center w-full md:w-1/2 md:inset-y-48 md:left-20">
        {children}
      </div>
      <TempCopyright className="text-white bottom-4 absolute" />
    </section>
  );
};

export default GuestLoginLayout;
