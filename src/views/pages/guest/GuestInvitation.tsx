import React from 'react';
import { useParams } from 'react-router';

import GuestInvitationLayout from 'views/components/molecules/Layout/GuestInvitationLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import RsvpForm from 'views/components/organisms/RsvpForm';

const GuestInvitation: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId!;

  return (
    <GuestInvitationLayout>
      <div className="grid grid-cols-1 justify-items-center lg:grid-cols-2 bg-white rounded-2xl mx-20 p-20 gap-12">
        <CardWeddingInfo />
        <RsvpForm eventId={eventId} />
      </div>
    </GuestInvitationLayout>
  );
};

export default GuestInvitation;
