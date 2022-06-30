import React from 'react';
import { useParams } from 'react-router';
import useAuthErrorModal from 'hooks/useAuthErrorModal';

import GuestInvitationLayout from 'views/components/molecules/Layout/GuestInvitationLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import RsvpForm from 'views/components/organisms/RsvpForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const GuestInvitation: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId!;

  const {
    status: status,
    errorMessages: errorMessages,
    closeModalHandler: closeModalHandler,
    showModalHandler: showModalHandler,
    isModalShown: isModalShown,
  } = useAuthErrorModal();

  return (
    <>
      {errorMessages && (
        <ErrorModal
          show={isModalShown}
          onCancel={closeModalHandler}
          messages={errorMessages as string[]}
          button="Submit Again"
          buttonStyle="bg-Green-default text-white"
        />
      )}
      <GuestInvitationLayout>
        <div className="grid grid-cols-1 justify-items-center lg:grid-cols-2 bg-white rounded-2xl mx-4 sm:mx-20 px-0 md:px-20 py-16 gap-4">
          <CardWeddingInfo />
          <RsvpForm eventId={eventId} onShowModal={showModalHandler} />
        </div>
      </GuestInvitationLayout>
    </>
  );
};

export default GuestInvitation;
