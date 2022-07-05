import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useNavigate } from 'react-router';
import { editEvent, getEventByUserId } from 'redux/eventSlice';
import { RootState } from 'redux/store';
import { IEventRequest } from 'types/EventData.type';
import useEventErrorModal from 'hooks/useEventErrorModal';

import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import EditEventForm from 'views/components/organisms/EditEventForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const AdminEventEdit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useEventErrorModal();

  const { SK: userId } = useAppSelector(
    (state: RootState) => state.adminUser.user
  );
  const { event } = useAppSelector((state: RootState) => state.event);

  const formSubmitLogic = async (formInput: IEventRequest) => {
    console.log('formInput', formInput);

    const result = await dispatch(editEvent(formInput));

    // createEvent success
    if (editEvent.fulfilled.match(result)) {
      navigate('/admin/event');
    }
    // createEvent failed
    if (editEvent.rejected.match(result)) {
      showModalHandler();
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getEventByUserId(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <ErrorModal
        show={isModalShown}
        onCancel={closeModalHandler}
        messages={errorMessages as string[]}
        button="Try Again"
        buttonStyle="bg-Pink-default text-white"
      />
      <AdminPageLayout>
        <h2 className="mb-2">Edit invitations</h2>
        <EditEventForm
          className="w-4/5"
          updateButtonText="Update invitation"
          formSubmitLogic={formSubmitLogic}
          formInitialValues={event}
        />
      </AdminPageLayout>
    </>
  );
};

export default AdminEventEdit;
