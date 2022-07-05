import useLogout from 'hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

type Props = {
  eventId: string;
};

const GuestNavbar: React.FC<Props> = ({ eventId }) => {
  const navigate = useNavigate();
  const { initGuestStateForLogout } = useLogout();

  const logoutHandler = () => {
    // update state
    initGuestStateForLogout();

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
