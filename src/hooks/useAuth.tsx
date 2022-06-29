import { SessionKeys } from 'constants/sessionKeys';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { ONE_SECOND } from '../constants/time';
import { authActions } from '../redux/authSlice';

// this stay outside of component because not related to re-render
let logoutTimer: NodeJS.Timeout;

const useAuth = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();
  // const [token, setToken] = useState<string>();
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);
  const { isLogin, tokenExpirationDate, token } = auth;
  const { setIsLogin, setToken, setTokenExpirationDate } = authActions;

  const logout = useCallback(() => {
    localStorage.removeItem(SessionKeys.TOKEN);

    // update state
    dispatch(setTokenExpirationDate(null));
    dispatch(setIsLogin(false));
  }, [dispatch, setIsLogin, setTokenExpirationDate]);

  const login = useCallback(
    (expirationDate?: Date) => {
      console.log('login');

      // ask backend to login and get token
      const JWT = 'JWT come from backend' + Math.random().toString();

      // generate expiration time
      const currentTime = new Date().getTime();
      const tokenExpirationDate =
        expirationDate || new Date(currentTime + ONE_SECOND * 3);

      // save to storage
      localStorage.setItem(
        SessionKeys.TOKEN,
        JSON.stringify({
          token: JWT,
          expiration: tokenExpirationDate.toISOString(),
        })
      );

      // set to state
      dispatch(setTokenExpirationDate(tokenExpirationDate));
      dispatch(setToken(JWT));
      dispatch(setIsLogin(true));
    },
    [dispatch, setIsLogin, setToken, setTokenExpirationDate]
  );

  const autoLogout = useCallback(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      console.log('remainingTime', remainingTime);

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // for manual logout
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  const autoLogin = useCallback(() => {
    const storedData = localStorage.getItem(SessionKeys.TOKEN);

    if (!storedData) {
      return;
    }

    const restoredData = JSON.parse(storedData);

    // 1. data is stored
    // 2. data has token
    // 3. token is valid, unexpired
    const isStoredTokenValid =
      restoredData &&
      restoredData.token &&
      new Date(restoredData.expiration) > new Date();

    if (isStoredTokenValid) {
      login(new Date(restoredData.expiration));
    }
  }, [login]);

  useEffect(() => {
    autoLogout();
  }, [autoLogout]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return {
    isLogin,
    login,
    logout,
  };
};

export default useAuth;
