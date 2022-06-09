import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminEventCreate from './views/pages/AdminEventCreate';
import AdminHome from './views/pages/AdminHome';
import AdminLogin from './views/pages/AdminLogin';
import AdminRegister from './views/pages/AdminRegister';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<AdminHome />} />
        <Route path="register" element={<AdminRegister />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="create" element={<AdminEventCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
