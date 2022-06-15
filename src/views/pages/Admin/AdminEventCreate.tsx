import { useState } from 'react';
import EventLayout from 'views/components/atomic/templates/EventLayout';

const initialState = {
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

function AdminEventCreate() {
  const [formState, setFormState] = useState(initialState);

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
      setFormState={setFormState}
      ctaTxt="Create invitations"
    />
  );
}

export default AdminEventCreate;
