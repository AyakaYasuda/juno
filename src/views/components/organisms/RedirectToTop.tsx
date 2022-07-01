import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

type Props = {
  isLogin: boolean;
  redirectTo: string;
};

const RedirectToTop = (props: Props) => {
  const { redirectTo, isLogin } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate(redirectTo);
    }
  }, [isLogin, redirectTo, navigate]);

  return (
    <div>
      <h1>RedirectToTop</h1>
      <Outlet />
    </div>
  );
};

export default RedirectToTop;
