import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getEvent, getGuests } from 'redux/eventThunkSlice';
import Modal from 'views/components/molecules/Modal';
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
  const [showInfoStyle, setShowInfoStyle] = useState('w-full');
  const [showGuestsStyle, setShowGuestsStyle] = useState('hidden');
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

  // FIXME: change to toggle style, not css props
  const showInfoHandler = () => {
    setShowInfoStyle('block w-full');
    setShowGuestsStyle('hidden');
  };

  // FIXME: change to toggle style, not css props
  const showGuestsHandler = () => {
    setShowInfoStyle('hidden');
    setShowGuestsStyle('block w-full');
  };

  const showModalHandler = (userId: string) => {
    setShowModal(true);
    setSelectedGuestUserId(userId);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <AdminPageLayout>
      {showModal && (
        <Modal
          closeHandler={closeModalHandler}
          guestUserId={selectedGuestUserId}
        />
      )}
      {isLoading && <h3 className="text-Pink-dark">Loading....</h3>}
      {event && (
        <>
          <MobileToggleSectionHeaders
            onShowGuests={showGuestsHandler}
            onShowInfo={showInfoHandler}
          />
          <div className="w-4/5 h-3/4 flex flex-row gap-14 text-white">
            <EventInfo event={event} showInfoStyle={showInfoStyle} />
            <GuestsList
              guests={guests}
              showGuestsStyle={showGuestsStyle}
              showModalHandler={showModalHandler}
            />
          </div>
        </>
      )}
    </AdminPageLayout>
  );
};

export default AdminEventDetail;
