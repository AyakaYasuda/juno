import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getEvent, getGuests } from 'redux/eventThunkSlice';
import Modal from 'views/components/molecules/Modal';
import Button from 'views/components/atoms/Button';
import Paragraph from 'views/components/atoms/Paragraph';
import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import MobileToggleSectionHeaders from 'views/components/organisms/MobileToggleSectionHeaders';
import EventInfo from 'views/components/organisms/EventInfo';

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

  const showInfoHandler = () => {
    setShowInfoStyle('block w-full');
    setShowGuestsStyle('hidden');
  };

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
            {
              <div className={`${showGuestsStyle} md:block md:basis-1/2`}>
                <h2 className="hidden md:block mb-2">Guests list</h2>
                <ul className="overflow-y-scroll h-4/5">
                  {guests &&
                    guests.map((guest) => {
                      return (
                        <li className="InputLighter FlexCenter mb-2 rounded-2xl px-4">
                          <span className="basis-3/5">{`${guest.firstName} ${guest.lastName}`}</span>
                          {guest.isAttending ? (
                            <Button customStyle="basis-1/5 bg-Green-default text-white drop-shadow-md mr-2">
                              PRESENT
                            </Button>
                          ) : (
                            <Button customStyle="basis-1/5 text-Green-default border-2 border-Green-default drop-shadow-md mr-2">
                              ABSENT
                            </Button>
                          )}
                          <button
                            onClick={() => showModalHandler(guest.userId)}
                            className="text-Pink-dark basis-1/5"
                          >
                            Show Detail
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            }
          </div>
        </>
      )}
    </AdminPageLayout>
  );
};

export default AdminEventDetail;
