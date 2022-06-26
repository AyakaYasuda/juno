import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';

import FlowerA from '../../../../assets/images/invitation-flower1.png';
import FlowerB from '../../../../assets/images/invitation-flower2.png';

type Props = {
  children: React.ReactNode;
};

const GuestInvitationLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className="w-full pt-20 FlexCenter flex-col bg-gradient-to-t from-Green-default to-White-darker md:min-h-screen relative">
      <img
        src={FlowerA}
        alt="flower"
        className="w-medium fixed top-0 right-0"
      />
      {children}
      <img src={FlowerB} alt="flower" className="w-1/4 fixed bottom-0 left-0" />
      <TempCopyright className="text-Pink-dark bottom-4 absolute" />
    </section>
  );
};

export default GuestInvitationLayout;
