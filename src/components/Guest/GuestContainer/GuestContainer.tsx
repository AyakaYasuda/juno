import React from 'react';

interface GuestContainerProps {
  children: JSX.Element;
}

const GuestContainer = ({ children }: GuestContainerProps) => {
  return (
    <div className="bg-gradient-to-r from-#99C698 0% to-#DEECDD 99.99%">
      {children}
    </div>
  );
};

export default GuestContainer;
