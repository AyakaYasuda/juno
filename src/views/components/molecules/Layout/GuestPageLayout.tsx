import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';
import Navbar from 'views/components/organisms/Navbar';

type Props = {
  children: React.ReactNode;
};

const GuestPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <section className="w-full flex items-center flex-col relative min-h-screen pt-20 bg-gradient-to-t from-Green-default to-White-darker">
        <Navbar
          bgColor="Green-default"
          link={<></>}
          redirectPath="/guests/login"
        />
        {children}
        <TempCopyright className="mb-5" />
      </section>
    </>
  );
};

export default GuestPageLayout;
