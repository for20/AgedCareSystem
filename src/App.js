import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome';
import MembersLogin from './pages/memberslogin';
import StaffLogin from './pages/stafflogin';
import AdminLogin from './pages/adminlogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/members" element={<MembersLogin />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
