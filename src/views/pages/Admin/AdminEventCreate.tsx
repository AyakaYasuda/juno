import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'app/hooks';
import { createEvent } from 'features/event/eventThunkSlice';

import EventLayout from 'views/components/atomic/templates/EventLayout';

const AdminEventCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

    // evenetCreate success
    if (createEvent.fulfilled.match(result)) {
      alert('eventCreate successfuly!');
      navigate('/admin/event');
    }
    // evenetCreate failed
    if (createEvent.rejected.match(result)) {
      alert('eventCreate failed...');
    }
  };

  return (
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
}

export default AdminEventCreate;
