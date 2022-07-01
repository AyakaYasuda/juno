import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { editUser, getUserById } from 'redux/adminUserSlice';
import { useNavigate } from 'react-router';

import GuestPageLayout from 'views/components/molecules/Layout/GuestPageLayout';
import CardWeddingInfo from 'views/components/organisms/CardWeddingInfo';
import YourReplyEditForm from 'views/components/organisms/YourReplyEditForm';
import { IUpdateUserRequest } from 'types/UserData.type';
import { getGuestAuth } from 'services/auth.service';

const GuestEdit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEventInfoShown, setIsEventInfoShown] = useState<boolean>(false);
  const [isYourReplyShown, setIsYourReplyShown] = useState<boolean>(true);

  const switchContentsHandler = () => {
    setIsEventInfoShown((prev) => !prev);
    setIsYourReplyShown((prev) => !prev);
  };
  console.log('EventInfo', isEventInfoShown);
  console.log('YourReply', isYourReplyShown);

  const { user } = useAppSelector((state) => state.guestUser);
  const { SK: userId } = user;

  useEffect(() => {
    const token = getGuestAuth();
    if (userId && token) {
      dispatch(getUserById({ userId: userId, token }));
    }
  }, [userId, dispatch]);

  const editHandler = async (updatedUser: IUpdateUserRequest) => {
    await dispatch(editUser(updatedUser));
    navigate('/guests/mypage');
  };

  const desktopContent = (
    <div className="hidden lg:grid grid-cols-2 justify-items-center py-10 px-20 gap-5">
      <div className="flex flex-col items-center w-full">
        <h2 className="mb-10">Event Info</h2>
        <CardWeddingInfo />
      </div>
      <div className="flex flex-col items-center w-full">
        <h2 className="mb-10">Your Reply</h2>
        <YourReplyEditForm formInitialValues={user} onSubmit={editHandler} />
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
        <YourReplyEditForm formInitialValues={user} onSubmit={editHandler} />
      )}
    </div>
  );

  return (
    <div>
      <GuestPageLayout>
        {desktopContent}
        {mobileContent}
      </GuestPageLayout>
    </div>
  );
};

export default GuestEdit;
