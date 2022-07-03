import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';
import GuestNavbar from 'views/components/organisms/GuestNavbar';

type Props = {
  children: React.ReactNode;
};

const GuestPageLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      <section className="w-full flex items-center flex-col relative min-h-screen pt-20 bg-gradient-to-t from-Green-default to-White-darker">
        <GuestNavbar />
        {children}
        <TempCopyright className="mb-5" />
      </section>
    </>
  );
};

export default GuestPageLayout;
