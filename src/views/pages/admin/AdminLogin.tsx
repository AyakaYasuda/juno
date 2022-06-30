import useErrorModal from 'hooks/useErrorModal';

import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminLoginForm from 'views/components/organisms/AdminLoginForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const AdminLogin = () => {
  const {
    status,
    errorMessage,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useErrorModal();

  console.log('errorMessage', errorMessage);

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
