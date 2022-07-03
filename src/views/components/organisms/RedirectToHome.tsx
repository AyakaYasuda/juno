import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

type Props = {
  isLogin: boolean;
  redirectTo: string;
};

// FIXME: delete duplicate code
const RedirectToHome = (props: Props) => {
  const { redirectTo, isLogin } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate(redirectTo);
    }
  }, [isLogin, redirectTo, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RedirectToHome;
