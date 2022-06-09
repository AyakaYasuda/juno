import React from 'react';

type GuestContainerProps = {
  children: JSX.Element;
};

const GuestContainer: React.FC<GuestContainerProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-#99C698 0% to-#DEECDD 99.99%">
      {children}
    </div>
  );
};

export default GuestContainer;
