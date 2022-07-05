import { SessionKeys } from 'constants/sessionKeys';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { adminAuthActions } from 'redux/adminAuthSlice';
import { adminUserActions } from 'redux/adminUserSlice';
import { eventActions } from 'redux/eventSlice';
import { guestAuthActions } from 'redux/guestAuthSlice';
import { guestUserActions } from 'redux/guestUserSlice';
import SessionServices from 'services/session.services';

const useLogout = () => {
  const dispatch = useDispatch();

  const { initState: initAdminAuthState } = adminAuthActions;
  const { initState: initAdminUserState } = adminUserActions;
  const { initState: initEventState } = eventActions;
  const { initState: initGuestAuthState } = guestAuthActions;
  const { initState: initGuestUserState } = guestUserActions;

  const initAdminStateForLogout = useCallback(() => {
    // init state
    dispatch(initAdminAuthState());
    dispatch(initAdminUserState());
    dispatch(initEventState());
  }, [dispatch, initAdminAuthState, initAdminUserState, initEventState]);

  const initGuestStateForLogout = useCallback(() => {
    // init state
    dispatch(initGuestAuthState());
    dispatch(initGuestUserState());
    dispatch(initEventState());
  }, [dispatch, initGuestAuthState, initGuestUserState, initEventState]);

  const deleteGuestLocalStorageData = useCallback(() => {
    SessionServices.removeItem(SessionKeys.GUEST_USER_ID);
    SessionServices.removeItem(SessionKeys.GUEST_TOKEN);
  }, []);

  const deleteAdminLocalStorageData = useCallback(() => {
    SessionServices.removeItem(SessionKeys.ADMIN_USER_ID);
    SessionServices.removeItem(SessionKeys.ADMIN_TOKEN);
  }, []);

  return {
    initAdminStateForLogout,
    initGuestStateForLogout,
    deleteGuestLocalStorageData,
    deleteAdminLocalStorageData,
  };
};

export default useLogout;
