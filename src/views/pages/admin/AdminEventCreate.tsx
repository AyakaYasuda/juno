import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import useEventErrorModal from 'hooks/useEventErrorModal';
import { IEventRequest } from 'types/EventData.type';
import { createEvent } from 'redux/eventSlice';

import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import EditEventForm from 'views/components/organisms/EditEventForm';
import ErrorModal from 'views/components/organisms/ErrorModal';
import { useCallback, useEffect } from 'react';
import { StateStatus } from 'types/StateStatus.type';

const AdminEventCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { event, status: stateStatus } = useAppSelector((state) => state.event);
  const { event: EventStateStatus } = stateStatus;
  const { SK: eventId } = event;

  const {
    status,
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useEventErrorModal();

  const navigateToEventDetailIfEventExist = useCallback(() => {
    if (EventStateStatus === StateStatus.fulfilled && eventId) {
      navigate('/admin/event');
    }
  }, [eventId, navigate, EventStateStatus]);

  const formSubmitLogic = async (formInput: IEventRequest) => {
    const result = await dispatch(createEvent(formInput));

    // createEvent success
    if (createEvent.fulfilled.match(result)) {
      navigate('/admin/event');
    }
    // createEvent failed
    if (createEvent.rejected.match(result)) {
      showModalHandler();
    }
  };

  useEffect(() => {
    navigateToEventDetailIfEventExist();
  }, [navigateToEventDetailIfEventExist]);

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
        <h2 className="mb-2">Create invitations</h2>
        <EditEventForm
          className="w-4/5"
          updateButtonText="Create invitations"
          formSubmitLogic={formSubmitLogic}
        />
      </AdminPageLayout>
      ;
    </>
  );
};

export default AdminEventCreate;
