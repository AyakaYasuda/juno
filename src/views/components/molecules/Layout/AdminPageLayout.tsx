import useRedirectIfNotLogin from 'hooks/useRedirectIfNotLogin';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import TempCopyright from 'views/components/atoms/TempCopyright';
import AdminNavbar from 'views/components/organisms/AdminNavbar';

type Props = {
  children: React.ReactNode;
};

const AdminPageLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const { isLogin } = useSelector((state: RootState) => state.adminAuth);

  useRedirectIfNotLogin(isLogin, '/admin');

  return (
    <section className="w-full flex items-center flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default relative min-h-screen text-Pink-default pt-20 ">
      <AdminNavbar />
      {children}
      <TempCopyright className="mb-5" />
    </section>
  );
};

export default AdminPageLayout;
