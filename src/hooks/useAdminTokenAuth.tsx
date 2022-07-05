import { SessionKeys } from 'constants/sessionKeys';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminAuthActions } from 'redux/adminAuthSlice';
import { RootState } from 'redux/store';
import SessionServices from 'services/session.services';
import useLogout from './useLogout';

// this stay outside of component because not related to re-render
let logoutTimer: NodeJS.Timeout;

// FIXME: delete duplicate code
const useAdminTokenAuth = () => {
  const dispatch = useDispatch();
  const { initAdminStateForLogout, deleteAdminLocalStorageData } = useLogout();

  const { setIsLogin, setToken, setTokenExpirationDate } = adminAuthActions;
  const { tokenExpirationDate, token } = useSelector(
    (state: RootState) => state.adminAuth
  );

  const logoutWithToken = useCallback(() => {
    initAdminStateForLogout();
    deleteAdminLocalStorageData();
  }, [initAdminStateForLogout, deleteAdminLocalStorageData]);

  // FIXME: adminLogin, guestLogin
  const loginWithToken = useCallback(() => {
    console.log('loginWithToken');

    const tokenData = SessionServices.getAdminTokenWithExpirationDate();
    if (!tokenData) {
      return;
    }

    const { token, expiration } = tokenData;
    SessionServices.setAdminTokenWithExpirationDate(
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

      logoutTimer = setTimeout(logoutWithToken, remainingTime);
    } else {
      // for manual logout
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logoutWithToken]);

  const autoLogin = useCallback(() => {
    const tokenData = SessionServices.getAdminTokenWithExpirationDate();

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
      SessionServices.removeItem(SessionKeys.ADMIN_TOKEN);
      SessionServices.removeItem(SessionKeys.ADMIN_USER_ID);
    }
  }, [loginWithToken]);

  useEffect(() => {
    autoLogout();
  }, [autoLogout]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);
};

export default useAdminTokenAuth;
