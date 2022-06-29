import { SessionKeys } from 'constants/sessionKeys';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'redux/authSlice';
import { RootState } from 'redux/store';
import SessionServices from 'services/session.services';

// this stay outside of component because not related to re-render
let logoutTimer: NodeJS.Timeout;

const useTokenAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { tokenExpirationDate, token } = auth;
  const dispatch = useDispatch();
  const { setIsLogin, setToken, setTokenExpirationDate } = authActions;

  // FIXME: to redux
  const logout = useCallback(() => {
    localStorage.removeItem(SessionKeys.TOKEN);

    // update state
    dispatch(setTokenExpirationDate(null));
    dispatch(setIsLogin(false));
  }, [dispatch, setIsLogin, setTokenExpirationDate]);

  const loginWithToken = useCallback(() => {
    console.log('loginWithToken');

    // ask backend to login and get token
    const tokenData = SessionServices.getTokenWithExpirationDate();
    if (!tokenData) {
      return;
    }

    const { token, expiration } = tokenData;
    SessionServices.setTokenWithExpirationDate(token, expiration);

    // set to state
    dispatch(setTokenExpirationDate(tokenExpirationDate));
    dispatch(setToken(token));
    dispatch(setIsLogin(true));
  }, [
    dispatch,
    setIsLogin,
    setToken,
    setTokenExpirationDate,
    tokenExpirationDate,
  ]);

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
    const tokenData = SessionServices.getTokenWithExpirationDate();

    if (!tokenData) {
      return;
    }

    // 1. data is stored
    // 2. data has token
    // 3. token is valid, unexpired
    const isStoredTokenValid =
      tokenData &&
      tokenData.token &&
      new Date(tokenData.expiration) > new Date();

    if (isStoredTokenValid) {
      loginWithToken();
    }
  }, [loginWithToken]);

  useEffect(() => {
    autoLogout();
  }, [autoLogout]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);
};

export default useTokenAuth;
