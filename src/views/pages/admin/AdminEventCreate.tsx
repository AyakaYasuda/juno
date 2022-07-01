import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import useEventErrorModal from 'hooks/useEventErrorModal';
import { IEventRequest } from 'types/EventData.type';
import { createEvent } from 'redux/eventSlice';

import AlreadyHaveEvent from 'views/components/organisms/AlreadyHaveEvent';
import AdminPageLayout from 'views/components/molecules/Layout/AdminPageLayout';
import EditEventForm from 'views/components/organisms/EditEventForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const AdminEventCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { event } = useAppSelector((state) => state.event);

  const {
    status,
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useEventErrorModal();

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

  return (
    <>
      <ErrorModal
        show={isModalShown}
        onCancel={closeModalHandler}
        messages={errorMessages as string[]}
        button="Try Again"
        buttonStyle="bg-Pink-default text-white"
      />
      <AdminPageLayout>{pageContent}</AdminPageLayout>;
    </>
  );
};

export default AdminEventCreate;
