import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminEventCreate from './views/pages/Admin/AdminEventCreate';
import AdminHome from './views/pages/Admin/AdminHome';
import AdminLogin from './views/pages/Admin/AdminLogin';
import AdminRegister from './views/pages/Admin/AdminRegister';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create" element={<AdminEventCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
