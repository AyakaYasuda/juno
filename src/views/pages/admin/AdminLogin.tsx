import { useAppSelector } from 'hooks/hooks';
import { useState } from 'react';

import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminLoginForm from 'views/components/organisms/AdminLoginForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const AdminLogin = () => {
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  console.log('check in page', status, errorMessage);

  const closeModalHandler = () => {
    setIsModalShown(false);
  };

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  console.log('isModalShown:', isModalShown);

  return (
    <>
      <ErrorModal
        show={isModalShown}
        onCancel={closeModalHandler}
        message={errorMessage as string}
        button="Login Again"
        buttonStyle="bg-Pink-default text-white"
      />
      <AuthPageLayout>
        <h2 className="mb-4">Welcome Back</h2>
        <AdminLoginForm onShowModal={showModalHandler} />
      </AuthPageLayout>
    </>
  );
};

export default AdminLogin;
