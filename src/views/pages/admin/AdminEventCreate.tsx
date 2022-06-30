import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import AlreadyHaveEvent from 'views/components/organisms/AlreadyHaveEvent';
import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import EditEventForm from 'views/components/organisms/EditEventForm';
import { IEventRequest } from 'types/EventData.type';
import { createEvent } from 'redux/eventSlice';
import { useNavigate } from 'react-router';

const AdminEventCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { event } = useAppSelector((state) => state.event);

  const formSubmitLogic = async (formInput: IEventRequest) => {
    const result = await dispatch(createEvent(formInput));

    console.log('formInput', formInput);

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

  let pageContent = (
    <>
      <h2 className="mb-2">Create invitations</h2>
      <EditEventForm
        className="w-4/5"
        updateButtonText="Create invitations"
        formSubmitLogic={formSubmitLogic}
      />
    </>
  );

  if (event.SK) {
    pageContent = <AlreadyHaveEvent />;
  }

  return <AdminPageLayout>{pageContent}</AdminPageLayout>;
};

export default AdminEventCreate;
