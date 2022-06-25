import { Link } from 'react-router-dom';
import AuthPageLayout from 'views/components/molecules/Layout/AuthPageLayout';

const AdminHome = () => {
  return (
    <AuthPageLayout>
      <div className="mb-48 md:mb-24">
        <h1 className="font-allura text-white md:pt-20">Juno</h1>
        <h3 className="hidden md:block text-white ">
          Online Wedding Invitations <br /> &amp; RSVP management
        </h3>
      </div>
      <div className="w-3/5 my-0 mx-auto">
        <Link
          className="BaseButtonStyle bg-White-default text-Pink-default block mb-6"
          to="/admin/register"
        >
          Get Started
        </Link>
        <Link
          to="/admin/login"
          className="BaseButtonStyle bg-White-default text-Pink-default block"
        >
          Log In
        </Link>
      </div>
    </AuthPageLayout>
  );
};

export default AdminHome;
