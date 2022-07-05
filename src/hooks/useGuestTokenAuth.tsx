import { SessionKeys } from 'constants/sessionKeys';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guestAuthActions } from 'redux/guestAuthSlice';
import { RootState } from 'redux/store';
import SessionServices from 'services/session.services';
import useLogout from './useLogout';

// this stay outside of component because not related to re-render
let logoutTimer: NodeJS.Timeout;

// FIXME: delete duplicate code
const useGuestTokenAuth = () => {
  const dispatch = useDispatch();
  const { initGuestStateForLogout, deleteGuestLocalStorageData } = useLogout();

  const { setIsLogin, setToken, setTokenExpirationDate } = guestAuthActions;
  const { tokenExpirationDate, token } = useSelector(
    (state: RootState) => state.guestAuth
  );

  const logoutWithToken = useCallback(() => {
    initGuestStateForLogout();
    deleteGuestLocalStorageData();
  }, [initGuestStateForLogout, deleteGuestLocalStorageData]);

  const loginWithToken = useCallback(() => {
    console.log('loginWithToken');

    const tokenData = SessionServices.getGuestTokenWithExpirationDate();
    if (!tokenData) {
      return;
    }

    const { token, expiration } = tokenData;
    SessionServices.setGuestTokenWithExpirationDate(
      token,
      new Date(expiration)
    );

    // update state
    dispatch(setTokenExpirationDate(expiration));
    dispatch(setToken(token));
    dispatch(setIsLogin(true));
  }, [dispatch, setIsLogin, setToken, setTokenExpirationDate]);

  const autoLogout = useCallback(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();

      console.log('remainingTime', remainingTime);

      logoutTimer = setTimeout(logoutWithToken, remainingTime);
    } else {
      // for manual logout
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logoutWithToken]);

  const autoLogin = useCallback(() => {
    const tokenData = SessionServices.getGuestTokenWithExpirationDate();

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
    } else {
      SessionServices.removeItem(SessionKeys.GUEST_TOKEN);
      SessionServices.removeItem(SessionKeys.GUEST_USER_ID);
    }
  }, [loginWithToken]);

  useEffect(() => {
    autoLogout();
  }, [autoLogout]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);
};

export default useGuestTokenAuth;
