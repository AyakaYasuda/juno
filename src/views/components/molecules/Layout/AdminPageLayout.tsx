import React from 'react';
import { Link } from 'react-router-dom';

// import Button from '../../atoms/Button';
import Navbar from '../Navbar';

type Props = {
  children: React.ReactNode;
};

const AdminPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <section className="w-full pt-20 FlexCenter flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default md:min-h-screen relative text-Pink-default">
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
        <small className="text-center w-full mt-5 mb-5">
          &copy; Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
        </small>
      </section>
    </>
  );
};

export default AdminPageLayout;
