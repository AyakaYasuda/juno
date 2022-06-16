import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'app/hooks';
import { eventCreate } from 'features/event/eventThunkSlice';

import EventLayout from 'views/components/atomic/templates/EventLayout';

function AdminEventCreate() {
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

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await dispatch(
      eventCreate({
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
    console.log(result);

    // evenetCreate success
    if (eventCreate.fulfilled.match(result)) {
      alert('eventCreate successfuly!');
      navigate('/admin/event');
    }
    // evenetCreate failed
    if (eventCreate.rejected.match(result)) {
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
      submitHandler={submitHandler}
      ctaTxt="Create invitations"
    />
  );
}

export default AdminEventCreate;
