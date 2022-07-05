import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useParams } from 'react-router';
import { getGuestAuth } from 'services/auth.service';
import SessionServices from 'services/session.services';
import { getUserById } from 'redux/adminUserSlice';
import { StateStatus } from 'types/StateStatus.type';
import useRedirectIfNotLogin from 'hooks/useRedirectIfNotLogin';
import useGuestUser from 'hooks/useGuestUser';

import GuestPageLayout from 'views/components/molecules/Layout/GuestPageLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import YourReply from 'views/components/organisms/YourReply';
import LoadingSpinner from 'views/components/organisms/LoadingSpinner';

const GuestMyPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const eventId = params.eventId!;

  const [isEventInfoShown, setIsEventInfoShown] = useState<boolean>(true);
  const [isYourReplyShown, setIsYourReplyShown] = useState<boolean>(false);
  const [guestUserId] = useState(SessionServices.getGuestUserId());

  const { user, status: guestsStatus } = useAppSelector(
    (state) => state.guestUser
  );
  const { SK: userId } = user;
  const { isLogin } = useAppSelector((state) => state.guestAuth);

  useRedirectIfNotLogin(isLogin, `/guests/events/${eventId}/login`);

  useGuestUser(guestUserId as string)

  const showEventInfoHandler = () => {
    setIsEventInfoShown(true);
    setIsYourReplyShown(false);
  };

  const showReplyHandler = () => {
    setIsEventInfoShown(false);
    setIsYourReplyShown(true);
  };

  const desktopContent = (
    <div className="hidden lg:grid grid-cols-2 justify-items-center py-10 px-20 gap-5">
      <div className="flex flex-col items-center w-full">
        <h2 className="mb-10">Event Info</h2>
        <CardWeddingInfo />
      </div>
      <div className="flex flex-col items-center w-full">
        <h2 className="mb-10">Your Reply</h2>
        <YourReply user={user} eventId={eventId} />
      </div>
    </div>
  );

  const mobileContent = (
    <div className="w-full grid grid-cols-1 justify-items-center py-10 px-10 sm:px-20 lg:hidden">
      <div className="grid grid-cols-2 justify-items-center gap-10 mb-10">
        <h2
          className="HoverUnderLine cursor-pointer"
          onClick={showEventInfoHandler}
        >
          Event Info
        </h2>
        <h2
          className="HoverUnderLine cursor-pointer"
          onClick={showReplyHandler}
        >
          Your Reply
        </h2>
      </div>
      {isEventInfoShown && <CardWeddingInfo />}
      {isYourReplyShown && <YourReply user={user} eventId={eventId} />}
    </div>
  );

  let content = (
    <>
      {desktopContent}
      {mobileContent}
    </>
  );

  if (guestsStatus === StateStatus.pending) {
    content = <LoadingSpinner />;
  }

  return (
    <div>
      <GuestPageLayout eventId={eventId}>{content}</GuestPageLayout>
    </div>
  );
};

export default GuestMyPage;
