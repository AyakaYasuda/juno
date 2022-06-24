import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hooks';
import { useParams } from 'react-router';

import GuestInvitationLayout from 'views/components/molecules/Layout/GuestInvitationLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import RsvpForm from 'views/components/organisms/RsvpForm';

const GuestInvitation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const params = useParams();
  const eventId = params.eventId!;

  return (
    <GuestInvitationLayout
      bgClassName="w-full pt-20 FlexCenter flex-col bg-gradient-to-t from-Green-default to-White-darker md:min-h-screen relative"
      copyrightClassName="text-Pink-dark mb-5"
    >
      <div className="w-5/6 lg:w-4/5 my-8 md:h-4/5 bg-white FlexCenter rounded-2xl p-8 flex flex-col md:items-center lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <CardWeddingInfo spacing="" />
        </div>
        <div className="lg:w-1/2">
          <RsvpForm eventId={eventId} />
        </div>
      </div>
    </GuestInvitationLayout>
  );
};

export default GuestInvitation;
