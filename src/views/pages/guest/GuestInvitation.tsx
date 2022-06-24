import React from 'react';
import { useParams } from 'react-router';

import GuestInvitationLayout from 'views/components/molecules/Layout/GuestInvitationLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import RsvpForm from 'views/components/organisms/RsvpForm';

const GuestInvitation: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId!;

  return (
    <GuestInvitationLayout
      bgClassName="w-full pt-20 FlexCenter flex-col bg-gradient-to-t from-Green-default to-White-darker md:min-h-screen relative"
      copyrightClassName="text-Pink-dark mb-5"
    >
      <div className="w-5/6 lg:w-4/5 my-8 md:h-4/5 bg-white FlexCenter rounded-2xl py-10 px-4 md:py-10 md:px-10 flex flex-col md:items-center lg:flex-row gap-8">
        <div className="w-5/6 lg:w-1/2">
          <CardWeddingInfo spacing="" />
        </div>
        <div className="w-5/6 lg:w-1/2">
          <RsvpForm eventId={eventId} />
        </div>
      </div>
    </GuestInvitationLayout>
  );
};

export default GuestInvitation;
