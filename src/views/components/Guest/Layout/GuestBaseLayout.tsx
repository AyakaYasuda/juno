import React from 'react';
import Copyright from 'views/components/atomic/atoms/Copyright';

type GuestBaseLayoutProps = {
  children: React.ReactNode;
};

const GuestBaseLayout: React.FC<GuestBaseLayoutProps> = ({ children }) => {
  return (
    <div className="h-full lg:h-screen w-full bg-gradient-to-t from-Green-default to-White-darker flex ">
      {children}
      <Copyright textColor="text-Pink-dark" />
    </div>
  );
};

export default GuestBaseLayout;
