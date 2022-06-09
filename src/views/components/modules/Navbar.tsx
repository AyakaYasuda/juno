import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <nav className="NavBase text-Pink-default">
        <Link to="/admin" className="Hover font-allura text-5xl">
          Juno
        </Link>
        <ul className="flex">
          <li className="mr-4 Hover">Events</li>
          <li className="Hover">Logout</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
