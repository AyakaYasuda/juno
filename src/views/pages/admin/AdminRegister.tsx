import useAuthErrorModal from 'hooks/useAuthErrorModal';

import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminRegisterForm from 'views/components/organisms/AdminRegisterForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const AdminRegister = () => {
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
