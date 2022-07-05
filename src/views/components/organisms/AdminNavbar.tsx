import { SessionKeys } from 'constants/sessionKeys';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminAuthActions } from 'redux/adminAuthSlice';
import { adminUserActions } from 'redux/adminUserSlice';
import { eventActions } from 'redux/eventSlice';
import SessionServices from 'services/session.services';
import Navbar from './Navbar';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { initState: initAdminAuthState } = adminAuthActions;
  const { initState: initAdminUserState } = adminUserActions;
  const { initState: initEventState } = eventActions;

  const logoutHandler = () => {
    // FIXME: refactor to init data function

    // init state
    dispatch(initAdminAuthState());
    dispatch(initAdminUserState());
    dispatch(initEventState());

    // init token
    SessionServices.removeItem(SessionKeys.ADMIN_USER_ID);
    SessionServices.removeItem(SessionKeys.ADMIN_TOKEN);

    navigate('/admin/login');
  };

  return (
    <Navbar
      logoLink="/admin"
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
