import React from 'react';
import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import Img1 from 'views/images/invitation-flower1.png';
import Img2 from 'views/images/invitation-flower2.png';

type GuestInvitationLayoutProps = {
  // children: React.ReactNode;
};

const GuestInvitationLayout: React.FC<GuestInvitationLayoutProps> = () => {
  return (
    <GuestBaseLayout>
      <img
        src={Img1}
        alt="flower"
        className="w-widthMedium absolute top-0 right-0"
      />
      <div className="w-11/12 h-4/5 bg-white justify-center rounded-2xl">
        Hello
      </div>

      <img src={Img2} alt="flower" className="w-80 absolute bottom-0 left-0" />
    </GuestBaseLayout>
  );
};

export default GuestInvitationLayout;
