import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const logoutHandler = () => {
    setIsLogin(!isLogin);
    navigate('/admin/login');
  };

  return (
    <header>
      <nav className="NavBase text-Pink-default">
        <Link to="/admin" className="Hover font-allura text-5xl">
          Juno
        </Link>
        <ul className="flex">
          <li className="mr-4 Hover">
            <Link to="/admin/event">Events</Link>
          </li>
          {/* FIXME: add logout function related with state from redux */}
          <button onClick={logoutHandler} className="Hover">
            Logout
          </button>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
