import useGuestAuthErrorModal from 'hooks/useGuestAuthErrorModal';
import { useParams } from 'react-router';
import { useAppSelector } from 'hooks/hooks';
import useRedirectIfLogin from 'hooks/useRedirectIfLogin';

import GuestLoginLayout from 'views/components/molecules/Layout/GuestLoginLayout';
import Logo from 'views/components/atoms/Logo';
import GuestLoginForm from 'views/components/organisms/GuestLoginForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const GuestLogin = () => {
  const { isLogin } = useAppSelector((state) => state.guestAuth);
  const params = useParams();
  const eventId = params.eventId!;
  const {
    status,
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useGuestAuthErrorModal();

  useRedirectIfLogin(isLogin, `/guests/events/${eventId}/mypage`);

  return (
    <>
      <ErrorModal
        show={isModalShown}
        onCancel={closeModalHandler}
        messages={errorMessages as string[]}
        button="Login Again"
        buttonStyle="bg-Green-default text-white"
      />
      <GuestLoginLayout>
        <Logo />
        <h3 className="text-white">Guests Log In</h3>
        <GuestLoginForm onShowModal={showModalHandler} eventId={eventId} />
      </GuestLoginLayout>
    </>
  );
};

export default GuestLogin;
