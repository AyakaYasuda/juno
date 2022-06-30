import useAuthErrorModal from 'hooks/useAuthErrorModal';

import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminLoginForm from 'views/components/organisms/AdminLoginForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const AdminLogin = () => {
  const {
    status,
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useAuthErrorModal();

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
