import React from 'react';
import Copyright from 'views/components/atomic/atoms/Copyright';

type GuestBaseLayoutProps = {
  children: React.ReactNode;
};

const GuestBaseLayout: React.FC<GuestBaseLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-full md:bg-gradient-to-t from-Green-default to-White-darker flex justify-center items-center">
      {children}
      <Copyright
        classContainer="fixed left-0 bottom-0 text-center w-full"
        classText="text-Pink-dark text-xs"
      />
    </div>
  );
};

export default GuestBaseLayout;