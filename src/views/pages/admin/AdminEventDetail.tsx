import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getEvent, getGuests } from 'redux/eventThunkSlice';
import Navbar from 'views/components/molecules/Navbar';
import Modal from 'views/components/molecules/Modal';
import Button from 'views/components/atoms/Button';
import Paragraph from 'views/components/atoms/Paragraph';

const AdminEventDetail = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // FIXME: do you need it?
  const [showInfoStyle, setShowInfoStyle] = useState('w-full');
  const [showGuestsStyle, setShowGuestsStyle] = useState('hidden');
  const [showModal, setShowModal] = useState<boolean>(false);

  // FIXME: do you need it?
  const [guestUserId, setGuestUserId] = useState<string>('');

  const { SK: userId } = useAppSelector((state) => state.user.user);
  const { event } = useAppSelector((state) => state.event);
  const { guests } = useAppSelector((state) => state.event);

  const GUEST_PAGE_ROOT_URL = process.env.REACT_APP_GUEST_PAGE_ROOT_URL;

  useEffect(() => {
    if (userId) {
      dispatch(getEvent(userId));
    }
  }, [userId]);

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
    setShowGuestsStyle('block w-full');
    setShowInfoStyle('hidden');
  };

  const showModalHandler = (userId: string) => {
    setShowModal(true);
    setGuestUserId(userId);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar
        bgColor="Pink-default"
        link={
          <li className="mr-4 Hover">
            <Link to="/admin/event">Events</Link>
          </li>
        }
        redirectPath="/admin/login"
      />
      {showModal && (
        <Modal closeHandler={closeModalHandler} guestUserId={guestUserId} />
      )}
      <section className="w-full h-screen FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default relative">
        {isLoading && <h3 className="text-Pink-dark">Loading....</h3>}
        {event && (
          <>
            {/* FIXME: set active state to header, so that user can notice it's button */}
            <ul className="pt-16 flex flex-row justify-center gap-14 mb-6 md:hidden">
              <li onClick={showInfoHandler} className="HoverUnderLine">
                <h2 className="basis-1/2 text-4xl">Event info</h2>
              </li>
              <li onClick={showGuestsHandler} className="HoverUnderLine">
                <h2 className="basis-1/2 text-4xl">Guests list</h2>
              </li>
            </ul>
            <div className="w-4/5 h-3/4 flex flex-row gap-14 text-white">
              <div className={`${showInfoStyle} md:block md:basis-1/2`}>
                <h2 className="hidden md:block mb-2">Event info</h2>
                <div className="flex flex-col mb-8 md:mb-4">
                  <div className="flex flex-row justify-between items-center mb-3">
                    <span className="basis-1/4">Event URL</span>
                    {/* FIXME: create base-style for Paragraph */}
                    <Paragraph
                      text={`${GUEST_PAGE_ROOT_URL}/guests/invitation/${event.SK}`}
                      customClassName="InputLighter basis-3/4 px-2"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center mb-3">
                    <span className="basis-1/4">Bride</span>
                    <Paragraph
                      text={event.bride}
                      customClassName="InputLighter basis-3/4 px-2"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center mb-3">
                    <span className="basis-1/4">Groom</span>
                    <Paragraph
                      text={event.groom}
                      customClassName="InputLighter basis-3/4 px-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-8 md:mb-4">
                  <h4 className="mb-1">Date and Time of Wedding Ceremony</h4>
                  <Paragraph
                    text={event.dateWedding}
                    customClassName={'InputLighter mb-2 px-2'}
                  />
                  <h4 className="mb-1">Date and Time of Wedding Reception</h4>
                  <Paragraph
                    text={event.dateWeddingReception}
                    customClassName={'InputLighter mb-2 px-2'}
                  />
                  <h4 className="mb-1">Message</h4>
                  <Paragraph
                    text={event.message}
                    customClassName={'InputLighter mb-2 px-2 h-28'}
                  />
                </div>
                <ul className="w-4/5 mx-auto md:flex md:gap-4">
                  <li className="hidden md:block md:basis-1/2">
                    <Button customStyle="border-2 border-White-default">
                      Set uneditable
                    </Button>
                  </li>
                  <li className="md:basis-1/2">
                    <Button customStyle="border-2 border-White-default">
                      <Link to="/admin/edit">Edit event info</Link>
                    </Button>
                  </li>
                </ul>
              </div>
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
            </div>
          </>
        )}

        <small className="absolute bottom-5 text-center">
          &copy; Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
        </small>
      </section>
    </>
  );
};

export default AdminEventDetail;
