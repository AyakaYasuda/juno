import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { RootState } from 'redux/store';

type Props = {
  redirectTo: string;
};

const RedirectToTop = (props: Props) => {
  const { redirectTo } = props;
  const { isLogin } = useSelector((state: RootState) => state.auth);
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
