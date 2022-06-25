import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminRegisterForm from 'views/components/organisms/AdminRegisterForm';

const AdminRegister = () => {
  return (
    <AuthPageLayout>
      <h2 className="mb-4">Create your account</h2>
      <AdminRegisterForm />
    </AuthPageLayout>
  );
};

export default AdminRegister;
