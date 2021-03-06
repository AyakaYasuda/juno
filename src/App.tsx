import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
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
import useAdminTokenAuth from './hooks/useAdminTokenAuth';
import useGuestTokenAuth from 'hooks/useGuestTokenAuth';

const App = () => {
  useAdminTokenAuth();
  useGuestTokenAuth();

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create" element={<AdminEventCreate />} />
        <Route path="/admin/edit" element={<AdminEventEdit />} />
        <Route path="/admin/event" element={<AdminEventDetail />} />
        <Route
          path="/guests/invitation/:eventId"
          element={<GuestInvitation />}
        />
        <Route path="/guests/events/:eventId/login" element={<GuestLogin />} />
        <Route
          path="/guests/events/:eventId/mypage"
          element={<GuestMyPage />}
        />
        <Route path="/guests/events/:eventId/edit" element={<GuestEdit />} />
        <Route path="*" element={<Navigate to={'/admin'} />} />
      </Routes>
    </Router>
  );
};

export default App;
