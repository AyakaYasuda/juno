import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useNavigate } from 'react-router';
import { editEvent, getEvent } from 'redux/eventThunkSlice';
import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import Button from 'views/components/atoms/Button';
import Card from 'views/components/atoms/Card';

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
    <AdminPageLayout>
      <section className="w-full py-28 md:py-0 FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default md:h-screen relative text-Pink-default">
        <h2 className="mb-2">Create invitations</h2>
        <div className="w-4/5">
          <Card>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row p-4 md:gap-6"
            >
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Bride name</label>
                <input
                  type="text"
                  name="bride"
                  value={bride}
                  onChange={handleChange}
                  className="InputDark"
                />
                <label>Groom name</label>
                <input
                  type="text"
                  name="groom"
                  value={groom}
                  onChange={handleChange}
                  className="InputDark"
                />
                <label>Date and Time of Wedding Ceremony</label>
                <input
                  type="date"
                  name="dateWedding"
                  value={dateWedding}
                  onChange={handleChange}
                  className="InputDark"
                />
                <ul className="flex flex-row gap-6">
                  <li className="basis-1/2">
                    <span>Start</span>
                    <input
                      type="time"
                      name="startingTimeWedding"
                      value={startingTimeWedding}
                      onChange={handleChange}
                      className="InputDark w-full"
                    />
                  </li>
                  <li className="basis-1/2">
                    <span>End</span>
                    <input
                      type="time"
                      name="endingTimeWedding"
                      value={endingTimeWedding}
                      onChange={handleChange}
                      className="InputDark w-full"
                    />
                  </li>
                </ul>
                <label>Date and Time of Wedding Reception</label>
                <input
                  type="date"
                  name="dateWeddingReception"
                  value={dateWeddingReception}
                  onChange={handleChange}
                  className="InputDark"
                />
                <ul className="flex flex-row gap-6">
                  <li className="basis-1/2">
                    <span>Start</span>
                    <input
                      type="time"
                      name="startingTimeReception"
                      value={startingTimeReception}
                      onChange={handleChange}
                      className="InputDark w-full"
                    />
                  </li>
                  <li className="basis-1/2">
                    <span>End</span>
                    <input
                      type="time"
                      name="endingTimeReception"
                      value={endingTimeReception}
                      onChange={handleChange}
                      className="InputDark w-full"
                    />
                  </li>
                </ul>
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="mb-1">Address</label>
                <input
                  type="address"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  className="InputDark"
                />
                <label>Message</label>
                <input
                  type="textarea"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  className="InputDark h-48 mb-8"
                />
                <ul className="w-10/12 mx-auto md:flex">
                  <li className="mb-4 md:mb-0 md:mr-4 basis-1/2">
                    <Button customStyle="bg-Pink-default text-White-default">
                      Update invitations
                    </Button>
                  </li>
                  <li className="basis-1/2">
                    <Button customStyle="text-Pink-default border-2 border-Pink-default">
                      Cancel
                    </Button>
                  </li>
                </ul>
              </div>
            </form>
          </Card>
        </div>
        <small className="absolute bottom-5 text-center">
          &copy; Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
        </small>
      </section>
    </AdminPageLayout>
  );
};

export default AdminEventEdit;
