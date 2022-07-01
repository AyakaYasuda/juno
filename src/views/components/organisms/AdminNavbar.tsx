import { SessionKeys } from 'constants/sessionKeys';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminAuthActions } from 'redux/adminAuthSlice';
import SessionServices from 'services/session.services';
import Navbar from './Navbar';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setIsLogin, setTokenExpirationDate } = adminAuthActions;

  const logoutHandler = () => {
    // update state
    dispatch(setIsLogin(false));
    dispatch(setTokenExpirationDate(null));

    SessionServices.removeItem(SessionKeys.ADMIN_USER_ID);
    SessionServices.removeItem(SessionKeys.ADMIN_TOKEN);

    navigate('/admin/login');
  };

  return (
    <Navbar
      bgColor="Pink-default"
      link={
        <div className="mr-4 Hover">
          <Link to="/admin/event">Events</Link>
        </div>
      }
      onLogout={logoutHandler}
    />
  );
};

export default AdminNavbar;
