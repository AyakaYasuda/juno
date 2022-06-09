import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminEventCreate from 'views/pages/Admin/AdminEventCreate';
import AdminHome from 'views/pages/Admin/AdminHome';
import AdminLogin from 'views/pages/Admin/AdminLogin';
import AdminRegister from 'views/pages/Admin/AdminRegister';
import GuestInvitation from 'views/pages/Guest/GuestInvitation';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create" element={<AdminEventCreate />} />
      </Routes>
      <Routes>
        <Route path="guest" element={<GuestInvitation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
