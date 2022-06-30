import useErrorModal from 'hooks/useErrorModal';

import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminRegisterForm from 'views/components/organisms/AdminRegisterForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const AdminRegister = () => {
  const {
    status,
    errorMessage,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useErrorModal();

  return (
    <>
      <ErrorModal
        show={isModalShown}
        onCancel={closeModalHandler}
        message={errorMessage as string}
        button="Try Again"
        buttonStyle="bg-Pink-default text-white"
      />
      <AuthPageLayout>
        <h2 className="mb-4">Create your account</h2>
        <AdminRegisterForm onShowModal={showModalHandler} />
      </AuthPageLayout>
    </>
  );
};

export default AdminRegister;
