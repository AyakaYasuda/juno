import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { getGuestAuth } from 'services/auth.service';
import { getUserById as getGuestUserById } from 'redux/guestUserSlice';

const useGuestUser = (guestUserId: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getGuestAuth();

    if (guestUserId && token) {
      dispatch(getGuestUserById({ userId: guestUserId, token }));
    }
  }, [dispatch, guestUserId]);
};

export default useGuestUser;
