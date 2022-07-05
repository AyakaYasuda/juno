import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { getAdminAuth } from 'services/auth.service';
import { getUserById as getAdminUserById } from 'redux/adminUserSlice';

const useAdminUser = (adminUserId: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getAdminAuth();

    if (adminUserId && token) {
      dispatch(getAdminUserById({ userId: adminUserId, token }));
    }
  }, [dispatch, adminUserId]);
};

export default useAdminUser;
