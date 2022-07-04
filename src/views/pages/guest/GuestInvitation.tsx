import React from 'react';
import { useParams } from 'react-router';
import useGuestAuthErrorModal from 'hooks/useGuestAuthErrorModal';
import useGuestUserErrorModal from 'hooks/useGuestUserErrorModal';

import GuestInvitationLayout from 'views/components/molecules/Layout/GuestInvitationLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import RsvpForm from 'views/components/organisms/RsvpForm';
import ErrorModal from 'views/components/organisms/ErrorModal';
import { useAppSelector } from 'hooks/hooks';
import useRedirectIfLogin from 'hooks/useRedirectIfLogin';

const GuestInvitation: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId!;

  const { isLogin } = useAppSelector((state) => state.guestAuth);
  const {
    status,
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useGuestAuthErrorModal();
  const { status: userStatus, errorMessages: userErrorMessages } =
    useGuestUserErrorModal();

  useRedirectIfLogin(isLogin, `/guests/events/${eventId}/mypage`);

  return (
    <>
      {errorMessages && (
        <ErrorModal
          show={isModalShown}
          onCancel={closeModalHandler}
          messages={errorMessages as string[]}
          button="Try Again"
          buttonStyle="bg-Green-default text-white"
        />
      )}
      <GuestInvitationLayout>
        <div className="grid grid-cols-1 justify-items-center lg:grid-cols-2 bg-white rounded-2xl mx-4 sm:mx-20 px-0 md:px-20 py-16 gap-4">
          <CardWeddingInfo />
          <RsvpForm
            eventId={eventId}
            onShowModal={showModalHandler}
            createAttendanceError={userErrorMessages}
          />
        </div>
        <p>You've already replied? Login</p>
      </GuestInvitationLayout>
    </>
  );
};

export default GuestInvitation;
