import React from 'react';
import GuestBaseLayout from 'views/components/Guest/Layout/GuestBaseLayout';
import ImgFlower1 from 'views/images/invitation-flower1.png';
import ImgFlower2 from 'views/images/invitation-flower2.png';

import CardWeddingInfo from 'views/components/Guest/CardWeddingInfo';
import FormAttendance from 'views/components/Guest/FormAttendance';

type GuestInvitationLayoutProps = {
  // children: React.ReactNode;
};

const GuestInvitationLayout: React.FC<GuestInvitationLayoutProps> = () => {
  return (
    <GuestBaseLayout>
      <img
        src={ImgFlower1}
        alt="flower"
        className="w-medium fixed top-0 right-0"
      />
      <div className="w-5/6 lg:w-4/5 my-6 h-4/5 bg-white FlexCenter rounded-2xl">
        <div className=" w-11/12 h-5/6 my-6 flex flex-col items-center lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <CardWeddingInfo />
          </div>
          <div className="lg:w-1/2">
            <FormAttendance />
          </div>
        </div>
      </div>

      <img
        src={ImgFlower2}
        alt="flower"
        className="w-1/4 fixed bottom-0 left-0"
      />
    </GuestBaseLayout>
  );
};

export default GuestInvitationLayout;
