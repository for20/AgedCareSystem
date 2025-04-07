import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome';  // Import the welcome page from the pages folder
import AdminLogin from './pages/adminlogin';  // Import the admin login page from the pages folder
import StaffLogin from './pages/stafflogin';  // Import the staff login page from the pages folder
import MemberLogin from './pages/memberlogin';  // Import the member login page from the pages folder

function App() {
  return (
    <Router>
      <Routes>
        {/* Welcome page route */}
        <Route path="/" element={<Welcome />} />

        {/* Login routes for Admin, Staff, and Members */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/members" element={<MemberLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
