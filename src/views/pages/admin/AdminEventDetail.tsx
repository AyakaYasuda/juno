import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getEvent, getGuests } from 'redux/eventThunkSlice';
import Modal from 'views/components/organisms/Modal';
import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import MobileToggleSectionHeaders from 'views/components/organisms/MobileToggleSectionHeaders';
import EventInfo from 'views/components/organisms/EventInfo';
import GuestsList from 'views/components/organisms/GuestsList';

const AdminEventDetail = () => {
  const dispatch = useAppDispatch();

  const { SK: userId } = useAppSelector((state) => state.user.user);
  const { event } = useAppSelector((state) => state.event);
  const { guests } = useAppSelector((state) => state.event);

  // FIXME:
  // 1. add mobile first style
  // 2. toggle style by react, not css props

  // showInfo status
  // 1. block w-full
  // 2. hidden
  const [isEventInfoShown, setIsEventInfoShown] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedGuestUserId, setSelectedGuestUserId] = useState<string>('');

  useEffect(() => {
    if (userId) {
      dispatch(getEvent(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    setIsLoading(false);
    if (event) {
      dispatch(getGuests(event.SK));
    }
  }, [event, dispatch]);

  const toggleShowInfoHandler = () => {
    setIsEventInfoShown((prevState) => !prevState);
  };

  const showModalHandler = (userId: string) => {
    setShowModal(true);
    setSelectedGuestUserId(userId);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return <h3 className="text-Pink-dark">Loading....</h3>;
  }

  const mobileContent = (
    <>
      <MobileToggleSectionHeaders onToggle={toggleShowInfoHandler} />
      <div className="lg:hidden py-10 px-20 grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-12 text-white">
        {isEventInfoShown && (
          <EventInfo
            event={event}
            // FIXME: delete this
            showInfoStyle={''}
          />
        )}
        {!isEventInfoShown && (
          <GuestsList
            guests={guests}
            // FIXME: delete this
            showGuestsStyle={''}
            showModalHandler={showModalHandler}
          />
        )}
      </div>
    </>
  );

  const desktopContent = (
    <>
      <div className="hidden py-10 px-20 lg:grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-12 text-white">
        <EventInfo
          event={event}
          // FIXME: delete this
          showInfoStyle={''}
        />
        <GuestsList
          guests={guests}
          // FIXME: delete this
          showGuestsStyle={''}
          showModalHandler={showModalHandler}
        />
      </div>
    </>
  );

  return (
    <AdminPageLayout>
      {showModal && (
        <Modal
          closeHandler={closeModalHandler}
          guestUserId={selectedGuestUserId}
        />
      )}
      {event && mobileContent}
      {event && desktopContent}
    </AdminPageLayout>
  );
};

export default AdminEventDetail;
