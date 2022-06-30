import GuestLoginLayout from 'views/components/molecules/Layout/GuestLoginLayout';
import Logo from 'views/components/atoms/Logo';
import GuestLoginForm from 'views/components/organisms/GuestLoginForm';
import ErrorModal from 'views/components/organisms/ErrorModal';

const GuestLogin = () => {
  return (
    <GuestLoginLayout>
      <Logo />
      <h3 className="text-white">Guests Log In</h3>
      <GuestLoginForm />
    </GuestLoginLayout>
  );
};

export default GuestLogin;
