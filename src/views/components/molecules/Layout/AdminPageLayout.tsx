import React from 'react';
import { Link } from 'react-router-dom';
import TempCopyright from 'views/components/atoms/TempCopyright';

// import Button from '../../atoms/Button';
import Navbar from '../Navbar';

type Props = {
  children: React.ReactNode;
};

const AdminPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className="w-full flex items-center flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default relative min-h-screen text-Pink-default pt-20 ">
      <Navbar
        bgColor="Pink-default"
        link={
          <li className="mr-4 Hover">
            <Link to="/admin/event">Events</Link>
          </li>
        }
        redirectPath="/admin/login"
      />
      {children}
      <TempCopyright className="mb-5" />
    </section>
  );
};

export default AdminPageLayout;
