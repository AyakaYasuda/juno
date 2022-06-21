import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useNavigate } from 'react-router';
import { editEvent, getEvent } from 'redux/eventThunkSlice';

import EventLayout from 'views/components/atomic/templates/EventLayout';

const AdminEventEdit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { SK: userId } = useAppSelector((state) => state.user.user);
  const { event } = useAppSelector((state) => state.event);

  const initialFormState = {
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
  };
  const [formState, setFormState] = useState(initialFormState);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await dispatch(
      editEvent({
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

    setFormState(initialFormState);
    navigate('/admin/event');
  };

  useEffect(() => {
    console.log('userId', userId);
    if (userId) {
      dispatch(getEvent(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (event) {
      setFormState({
        bride: event.bride,
        groom: event.groom,
        dateWedding: event.dateWedding,
        startingTimeWedding: event.startingTimeWedding,
        endingTimeWedding: event.endingTimeWedding,
        dateWeddingReception: event.dateWeddingReception,
        startingTimeReception: event.startingTimeReception,
        endingTimeReception: event.endingTimeReception,
        address: event.address,
        message: event.message,
      });
    }
  }, [event]);

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
      ctaTxt="Update invitations"
    />
  );
};

export default AdminEventEdit;
