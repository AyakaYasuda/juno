import { SessionKeys } from 'constants/sessionKeys';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { guestAuthActions } from 'redux/guestAuthSlice';
import SessionServices from 'services/session.services';
import Navbar from './Navbar';

type Props = {
  eventId: string;
};

const GuestNavbar: React.FC<Props> = ({ eventId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setIsLogin, setTokenExpirationDate } = guestAuthActions;

  const logoutHandler = () => {
    // update state
    dispatch(setIsLogin(false));
    dispatch(setTokenExpirationDate(null));

    SessionServices.removeItem(SessionKeys.GUEST_USER_ID);
    SessionServices.removeItem(SessionKeys.GUEST_TOKEN);

    navigate(`/guests/events/${eventId}/login`);
  };

  return (
    <Navbar
      logoLink={`/guests/events/${eventId}/mypage`}
      bgColor="Green-default"
      onLogout={logoutHandler}
    />
  );
};

export default GuestNavbar;
