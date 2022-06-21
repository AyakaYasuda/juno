import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import AdminEventCreate from 'views/pages/admin/AdminEventCreate';
import AdminEventEdit from 'views/pages/admin/AdminEventEdit';
import AdminEventManage from 'views/pages/admin/AdminEventManage';
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
import { SessionKeys } from 'constants/sessionKeys';

const App = () => {
  const dispatch = useAppDispatch();
  const [userId] = useState(SessionServices.getItem(SessionKeys.USER_ID));

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create" element={<AdminEventCreate />} />
        <Route path="/admin/edit" element={<AdminEventEdit />} />
        <Route path="/admin/event" element={<AdminEventManage />} />
        <Route
          path="/guests/invitation/:eventId"
          element={<GuestInvitation />}
        />
        <Route path="/guests/login" element={<GuestLogin />} />
        <Route path="/guests/mypage" element={<GuestMyPage />} />
        <Route path="/guests/edit" element={<GuestEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
