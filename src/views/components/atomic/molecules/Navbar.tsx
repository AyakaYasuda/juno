import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type NavbarProps = {
  bgColor: string;
  link: JSX.Element;
};

const Navbar: React.FC<NavbarProps> = ({ bgColor, link }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const logoutHandler = () => {
    setIsLogin(!isLogin);
    navigate('/admin/login');
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
