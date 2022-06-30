import useErrorModal from 'hooks/useErrorModal';

import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminRegisterForm from 'views/components/organisms/AdminRegisterForm';

const AdminRegister = () => {
  const {
    status,
    errorMessage,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  } = useErrorModal();

  return (
    <AuthPageLayout>
      <h2 className="mb-4">Create your account</h2>
      <AdminRegisterForm />
    </AuthPageLayout>
  );
};

export default AdminRegister;
