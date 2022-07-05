import useLogout from 'hooks/useLogout';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { initAdminStateForLogout } = useLogout();

  const logoutHandler = () => {
    initAdminStateForLogout();

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
