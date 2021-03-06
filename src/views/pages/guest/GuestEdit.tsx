import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { editUser, getUserById } from 'redux/guestUserSlice';
import { useNavigate } from 'react-router';
import useGuestUserErrorModal from 'hooks/useGuestUserErrorModal';

import GuestPageLayout from 'views/components/molecules/Layout/GuestPageLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import YourReplyEditForm from 'views/components/organisms/YourReplyEditForm';
import { IUpdateUserRequest } from 'types/UserData.type';
import { getGuestAuth } from 'services/auth.service';
import ErrorModal from 'views/components/organisms/ErrorModal';
import { RootState } from 'redux/store';
import useRedirectIfNotLogin from 'hooks/useRedirectIfNotLogin';

const GuestEdit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const eventId = params.eventId!;

  const [isEventInfoShown, setIsEventInfoShown] = useState<boolean>(false);
  const [isYourReplyShown, setIsYourReplyShown] = useState<boolean>(true);
  const { isLogin } = useAppSelector((state: RootState) => state.guestAuth);
  const { user } = useAppSelector((state: RootState) => state.guestUser);
  const { SK: userId } = user;
  const {
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useGuestUserErrorModal();

  useRedirectIfNotLogin(isLogin, `/guests/events/${eventId}/login`);

  useEffect(() => {
    const token = getGuestAuth();
    if (userId && token) {
      dispatch(getUserById({ userId: userId, token }));
    }
  }, [userId, dispatch]);

  const switchContentsHandler = () => {
    setIsEventInfoShown((prev) => !prev);
    setIsYourReplyShown((prev) => !prev);
  };

  const editHandler = async (updatedUser: IUpdateUserRequest) => {
    const result = await dispatch(editUser(updatedUser));

    if (editUser.fulfilled.match(result)) {
      navigate(`/guests/events/${eventId}/mypage`);
    }

    // login failed
    if (editUser.rejected.match(result)) {
      showModalHandler();
    }
  };

  const desktopContent = (
    <div className="hidden lg:grid grid-cols-2 justify-items-center py-10 px-20 gap-5">
      <div className="flex flex-col items-center w-full">
        <h2 className="mb-10">Event Info</h2>
        <CardWeddingInfo />
      </div>
      <div className="flex flex-col items-center w-full">
        <h2 className="mb-10">Your Reply</h2>
        <YourReplyEditForm
          formInitialValues={user}
          onSubmit={editHandler}
          eventId={eventId}
        />
      </div>
    </div>
  );

  const mobileContent = (
    <div className="w-full grid grid-cols-1 justify-items-center py-10 px-10 sm:px-20 lg:hidden">
      <div className="grid grid-cols-2 justify-items-center gap-10 mb-10">
        <h2
          className="HoverUnderLine cursor-pointer"
          onClick={switchContentsHandler}
        >
          Event Info
        </h2>
        <h2
          className="HoverUnderLine cursor-pointer"
          onClick={switchContentsHandler}
        >
          Your Reply
        </h2>
      </div>
      {isEventInfoShown && <CardWeddingInfo />}
      {isYourReplyShown && (
        <YourReplyEditForm
          formInitialValues={user}
          onSubmit={editHandler}
          eventId={eventId}
        />
      )}
    </div>
  );

  return (
    <div>
      <ErrorModal
        show={isModalShown}
        onCancel={closeModalHandler}
        messages={errorMessages as string[]}
        button="Try Again"
        buttonStyle="bg-Green-default text-white"
      />
      <GuestPageLayout eventId={eventId}>
        {desktopContent}
        {mobileContent}
      </GuestPageLayout>
    </div>
  );
};

export default GuestEdit;
