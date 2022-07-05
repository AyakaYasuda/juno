import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getEventByUserId, getGuestsByEventId } from 'redux/eventSlice';
import { StateStatus } from 'types/StateStatus.type';
import SessionServices from 'services/session.services';
import useAdminUser from 'hooks/useAdminUser';

import Modal from 'views/components/organisms/Modal';
import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import MobileToggleSectionHeaders from 'views/components/organisms/MobileToggleSectionHeaders';
import EventInfo from 'views/components/organisms/EventInfo';
import GuestsList from 'views/components/organisms/GuestsList';
import LoadingSpinner from 'views/components/organisms/LoadingSpinner';

const AdminEventDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { SK: userId } = useAppSelector((state) => state.adminUser.user);
  const { event, status } = useAppSelector((state) => state.event);
  const { event: eventStateStatus, guests: guestsStateStatus } = status;
  const { SK: eventId } = event;
  const { guests } = useAppSelector((state) => state.event);
  
  const [adminUserId] = useState(SessionServices.getAdminUserId());
  const [isEventInfoShown, setIsEventInfoShown] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedGuestUserId, setSelectedGuestUserId] = useState<string>('');
  
  useAdminUser(adminUserId as string);

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


  useEffect(() => {
    if (userId) {
      dispatch(getEventByUserId(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (
      (eventStateStatus === StateStatus.rejected ||
        eventStateStatus === StateStatus.fulfilled) &&
      !eventId
    ) {
      navigate('/admin/create');
    }
  }, [eventId, eventStateStatus, navigate]);

  useEffect(() => {
    if (userId) {
      dispatch(getEventByUserId(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (eventId) {
      dispatch(getGuestsByEventId(eventId));
    }
  }, [eventId, dispatch]);

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

  const isDataReady =
    eventStateStatus &&
    guestsStateStatus &&
    eventStateStatus === StateStatus.fulfilled &&
    guestsStateStatus === StateStatus.fulfilled;

  return (
    <AdminPageLayout>
      {showModal && (
        <Modal
          closeHandler={closeModalHandler}
          guestUserId={selectedGuestUserId}
        />
      )}
      {!isDataReady && <LoadingSpinner />}
      {isDataReady && (
        <>
          {mobileContent}
          {desktopContent}
        </>
      )}
    </AdminPageLayout>
  );
};

export default AdminEventDetail;
