import React from 'react';
import Copyright from 'views/components/atoms/Copyright';

type GuestBaseLayoutProps = {
  children: React.ReactNode;
};

const GuestBaseLayout: React.FC<GuestBaseLayoutProps> = ({ children }) => {
  return (
    <>
      {/* FIXME: make flex-flow: column */}
      <div className="h-full lg:h-screen w-full bg-gradient-to-t from-Green-default to-White-darker flex ">
        {/* FIXME: add flex-row box to children */}
        {children}
      </div>
      {/* FIXME: delete fixed from copyright */}
      <Copyright textColor="text-Pink-dark" />
    </>
  );
};

export default GuestBaseLayout;
