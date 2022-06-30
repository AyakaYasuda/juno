import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SessionServices from 'services/session.services';
import { SessionKeys } from 'constants/sessionKeys';
import { useDispatch } from 'react-redux';
import { adminAuthActions } from '../../../redux/adminAuthSlice';

type NavbarProps = {
  bgColor: string;
  link: JSX.Element;
  redirectPath: string;
};

const Navbar: React.FC<NavbarProps> = ({ bgColor, link, redirectPath }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsLogin, setTokenExpirationDate } = adminAuthActions;

  const logoutHandler = () => {
    // update state
    dispatch(setIsLogin(false));
    dispatch(setTokenExpirationDate(null));

    SessionServices.removeItem(SessionKeys.USER_ID);
    SessionServices.removeItem(SessionKeys.TOKEN);

    navigate(redirectPath);
  };

  return (
    <header>
      <nav className={`NavBase text-${bgColor}`}>
        <Link to="/admin" className="Hover font-allura text-5xl">
          Juno
        </Link>
        <ul className="flex">
          {link}
          <button onClick={logoutHandler} className="Hover">
            Logout
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
