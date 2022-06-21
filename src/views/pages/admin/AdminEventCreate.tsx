import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { createEvent } from 'redux/eventThunkSlice';
import Navbar from 'views/components/molecules/Navbar';
import AlreadyHaveEvent from 'views/components/organisms/AlreadyHaveEvent';
import EventLayout from 'views/components/organisms/EventLayout';

const AdminEventCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { event } = useAppSelector((state) => state.event);

  const [formState, setFormState] = useState({
    bride: '',
    groom: '',
    dateWedding: '',
    startingTimeWedding: '',
    endingTimeWedding: '',
    dateWeddingReception: '',
    startingTimeReception: '',
    endingTimeReception: '',
    address: '',
    message: '',
  });

  const {
    bride,
    groom,
    dateWedding,
    startingTimeWedding,
    endingTimeWedding,
    dateWeddingReception,
    startingTimeReception,
    endingTimeReception,
    address,
    message,
  } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await dispatch(
      createEvent({
        bride,
        groom,
        dateWedding,
        startingTimeWedding,
        endingTimeWedding,
        dateWeddingReception,
        startingTimeReception,
        endingTimeReception,
        address,
        message,
      })
    );

    // createEvent success
    if (createEvent.fulfilled.match(result)) {
      alert('eventCreate successfully!');
      navigate('/admin/event');
    }
    // createEvent failed
    if (createEvent.rejected.match(result)) {
      alert('eventCreate failed...');
    }
  };

  // FIXME : improve the logic
  return event.SK !== '' ? (
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
      <section className="w-full py-28 md:py-0 FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default md:h-screen relative text-Pink-default">
        <AlreadyHaveEvent />
      </section>
    </>
  ) : (
    <EventLayout
      title="Create invitations"
      bride={bride}
      groom={groom}
      dateWedding={dateWedding}
      startingTimeWedding={startingTimeWedding}
      endingTimeWedding={endingTimeWedding}
      dateWeddingReception={dateWeddingReception}
      startingTimeReception={startingTimeReception}
      endingTimeReception={endingTimeReception}
      address={address}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      ctaTxt="Create invitations"
    />
  );
};

export default AdminEventCreate;
