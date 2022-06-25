import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';
import AdminLoginForm from 'views/components/organisms/AdminLoginForm';

const AdminLogin = () => {
  return (
    <AuthPageLayout>
      <h2 className="mb-4">Welcome Back</h2>
      <AdminLoginForm />
    </AuthPageLayout>
  );
};

export default AdminLogin;
