import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useNavigate } from 'react-router';
import { editEvent, getEvent } from 'redux/eventThunkSlice';
import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import { RootState } from 'redux/store';
import EditEventForm from 'views/components/organisms/EditEventForm';
import { IEventRequest } from 'types/EventData.type';

const AdminEventEdit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { SK: userId } = useAppSelector((state: RootState) => state.user.user);
  const { event } = useAppSelector((state: RootState) => state.event);

  const formSubmitLogic = async (formInput: IEventRequest) => {
    console.log('formInput', formInput);

    await dispatch(editEvent(formInput));

    navigate('/admin/event');
  };

  useEffect(() => {
    if (userId) {
      dispatch(getEvent(userId));
    }
  }, [dispatch, userId]);

  return (
    <AdminPageLayout>
      <h2 className="mb-2">Edit invitations</h2>
      <EditEventForm
        className="w-4/5"
        updateButtonText="Update invitation"
        formSubmitLogic={formSubmitLogic}
        formInitialValues={event}
      />
    </AdminPageLayout>
  );
};

export default AdminEventEdit;
