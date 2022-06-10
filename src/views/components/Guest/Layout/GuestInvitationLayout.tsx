import React from 'react';
import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import Img1 from 'views/images/invitation-flower1.png';
import Img2 from 'views/images/invitation-flower2.png';

import CardWeddingInfo from 'views/components/Guest/CardWeddingInfo';
import FormAttendance from 'views/components/Guest/FormAttendance';

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
      <div className="w-4/5 h-4/5 bg-white FlexCenter rounded-2xl">
        <div className=" w-4/5 h-4/6 flex gap-4">
          <div className="w-1/2">
            <CardWeddingInfo />
          </div>
          <div className="w-1/2">
            <FormAttendance />
          </div>
        </div>
      </div>

      <img src={Img2} alt="flower" className="w-80 absolute bottom-0 left-0" />
    </GuestBaseLayout>
  );
};

export default GuestInvitationLayout;
