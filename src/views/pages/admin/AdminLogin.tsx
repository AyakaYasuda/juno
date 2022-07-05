import useAdminAuthErrorModal from 'hooks/useAdminAuthErrorModal';

import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminLoginForm from 'views/components/organisms/AdminLoginForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const AdminLogin = () => {
  const {
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useAdminAuthErrorModal();

  return (
    <>
      <ErrorModal
        show={isModalShown}
        onCancel={closeModalHandler}
        messages={errorMessages as string[]}
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
