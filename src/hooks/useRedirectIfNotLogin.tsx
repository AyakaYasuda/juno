import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useRedirectIfNotLogin = (isLogin: boolean, redirectTo: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate(redirectTo);
    }
  }, [isLogin, navigate, redirectTo]);
};

export default useRedirectIfNotLogin;
