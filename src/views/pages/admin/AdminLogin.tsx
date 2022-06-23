import TopLayout from 'views/components/organisms/TopLayout';
import AdminLoginForm from 'views/components/organisms/AdminLoginForm';

const AdminLogin = () => {
  return (
    <TopLayout>
      <h2 className="mb-4">Welcome Back</h2>
      <AdminLoginForm />
    </TopLayout>
  );
};

export default AdminLogin;
