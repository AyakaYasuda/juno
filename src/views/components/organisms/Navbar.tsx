import React from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = {
  bgColor: string;
  link?: JSX.Element;
  onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = (props) => {
  const { bgColor, link, onLogout } = props;

  const logoutHandler = () => {
    onLogout();
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
