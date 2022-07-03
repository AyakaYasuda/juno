import React from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = {
  logoLink: string;
  bgColor: string;
  link?: JSX.Element;
  onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = (props) => {
  const { logoLink, bgColor, link, onLogout } = props;

  const logoutHandler = () => {
    onLogout();
  };

  return (
    <header>
      <nav className={`NavBase text-${bgColor}`}>
        <Link to={logoLink} className="Hover font-allura text-5xl">
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
