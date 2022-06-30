import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import AdminEventCreate from 'views/pages/admin/AdminEventCreate';
import AdminEventEdit from 'views/pages/admin/AdminEventEdit';
import AdminEventDetail from 'views/pages/admin/AdminEventDetail';
import AdminHome from 'views/pages/admin/AdminHome';
import AdminLogin from 'views/pages/admin/AdminLogin';
import AdminRegister from 'views/pages/admin/AdminRegister';
import GuestInvitation from 'views/pages/guest/GuestInvitation';
import GuestLogin from 'views/pages/guest/GuestLogin';
import GuestMyPage from 'views/pages/guest/GuestMyPage';
import GuestEdit from 'views/pages/guest/GuestEdit';
import { useAppDispatch } from 'hooks/hooks';
import { getUser } from 'redux/userThunkSlice';
import SessionServices from 'services/session.services';
import useTokenAuth from './hooks/useTokenAuth';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import RedirectToTop from 'views/components/organisms/RedirectToTop';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useSelector((state: RootState) => state.auth);

  useTokenAuth();
  const [userId] = useState(SessionServices.getUserId());

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RedirectToTop redirectTo="/admin" />}>
          {isLogin && (
            <>
              <Route path="create" element={<AdminEventCreate />} />
              <Route path="edit" element={<AdminEventEdit />} />
              <Route path="event" element={<AdminEventDetail />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/admin" />} />
        </Route>

        <Route
          path="/guests/invitation/:eventId"
          element={<GuestInvitation />}
        />
        <Route path="/guests/login" element={<GuestLogin />} />
        <Route
          path="/guests"
          element={<RedirectToTop redirectTo="/guests/login" />}
        >
          <Route path="mypage" element={<GuestMyPage />} />
          <Route path="edit" element={<GuestEdit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
