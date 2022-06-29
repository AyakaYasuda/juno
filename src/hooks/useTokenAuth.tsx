import { SessionKeys } from 'constants/sessionKeys';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'redux/authSlice';
import { RootState } from 'redux/store';
import SessionServices from 'services/session.services';

// this stay outside of component because not related to re-render
let logoutTimer: NodeJS.Timeout;

const useTokenAuth = () => {
  const dispatch = useDispatch();

  const { setIsLogin, setToken, setTokenExpirationDate } = authActions;
  const { tokenExpirationDate, token } = useSelector(
    (state: RootState) => state.auth
  );

  const logoutWithToken = useCallback(() => {
    localStorage.removeItem(SessionKeys.TOKEN);

    // update state
    dispatch(setTokenExpirationDate(null));
    dispatch(setIsLogin(false));
  }, [dispatch, setIsLogin, setTokenExpirationDate]);

  const loginWithToken = useCallback(() => {
    console.log('loginWithToken');

    const tokenData = SessionServices.getTokenWithExpirationDate();
    if (!tokenData) {
      return;
    }

    const { token, expiration } = tokenData;
    SessionServices.setTokenWithExpirationDate(token, expiration);

    // update state
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

      logoutTimer = setTimeout(logoutWithToken, remainingTime);
    } else {
      // for manual logout
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logoutWithToken]);

  const autoLogin = useCallback(() => {
    const tokenData = SessionServices.getTokenWithExpirationDate();

    if (!tokenData) {
      return;
    }

    // token valid conditions are
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
