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
      <MobileToggleSectionHeaders
        onToggle={toggleShowInfoHandler}
        isEventInfoShown={isEventInfoShown}
      />
      <div className="lg:hidden w-full py-10 px-10 grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-12 text-white">
        {isEventInfoShown && <EventInfo event={event} />}
        {!isEventInfoShown && (
          <GuestsList guests={guests} showModalHandler={showModalHandler} />
        )}
      </div>
    </>
  );

  const desktopContent = (
    <>
      <div className="hidden py-10 px-20 lg:grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-12 text-white">
        <EventInfo event={event} />
        <GuestsList guests={guests} showModalHandler={showModalHandler} />
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
