import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/welcome";
import MemberLogin from "./pages/memberlogin";
import StaffLogin from "./pages/stafflogin";
import AdminLogin from "./pages/adminlogin";

import AdminHome from "./pages/admin/adminhome";
import AdminUserRegistration from "./pages/admin/adminuserregistration";

import ChiefHome from "./pages/admin/chiefhome";
import UserRegistration from "./pages/admin/chiefuserregistration";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/members" element={<MemberLogin />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/createuser" element={<AdminUserRegistration />} />

        {/* Chief Routes */}
        <Route path="/chief/userregistration" element={<UserRegistration />} />
        <Route path="/chief/home" element={<ChiefHome />} />
      </Routes>
    </Router>
  );
};

export default App;