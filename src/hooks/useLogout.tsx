import { SessionKeys } from 'constants/sessionKeys';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { adminAuthActions } from 'redux/adminAuthSlice';
import { adminUserActions } from 'redux/adminUserSlice';
import { eventActions } from 'redux/eventSlice';
import SessionServices from 'services/session.services';

const useLogout = () => {
  const dispatch = useDispatch();

  const { initState: initAdminAuthState } = adminAuthActions;
  const { initState: initAdminUserState } = adminUserActions;
  const { initState: initEventState } = eventActions;

  const initAdminStateForLogout = useCallback(() => {
    // init state
    dispatch(initAdminAuthState());
    dispatch(initAdminUserState());
    dispatch(initEventState());

    // init token
    SessionServices.removeItem(SessionKeys.ADMIN_USER_ID);
    SessionServices.removeItem(SessionKeys.ADMIN_TOKEN);
  }, [dispatch, initAdminAuthState, initAdminUserState, initEventState]);

  return { initAdminStateForLogout };
};

export default useLogout;
