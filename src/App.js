import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Welcome from "./pages/welcome";
import MemberLogin from "./pages/memberlogin";
import StaffLogin from "./pages/stafflogin";
import AdminLogin from "./pages/adminlogin";

// Chief
import ChiefHome from "./pages/admin/chiefhome";
import ChiefUserRegistration from "./pages/admin/chiefuserregistration";

// Admin
import AdminHome from "./pages/admin/adminhome";
import AdminUserRegistration from "./pages/admin/adminuserregistration";

// Staff Dashboards
import ManagerHome from "./pages/staff/managerhome";
import DoctorHome from "./pages/staff/doctorhome";
import CaregiverHome from "./pages/staff/caregiverhome";
import MinorStaffHome from "./pages/staff/minorstaffhome";

// Members
import FamilyHome from "./pages/members/familyhome";
import ElderlyOnSiteHome from "./pages/members/elderlyonsitehome";
import ElderlyInHomeHome from "./pages/members/elderlyinhomehome";

// In-Home Elderly Section
import Dashboard from "./pages/members/inhome/dashboard";
import MyCare from "./pages/members/inhome/mycare";
import DailySupport from "./pages/members/inhome/dailysupport";
import Appointments from "./pages/members/inhome/appointments";
import Messages from "./pages/members/inhome/messages";
import Billing from "./pages/members/inhome/billing";
import Settings from "./pages/members/inhome/settings";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Welcome />} />
        <Route path="/members" element={<MemberLogin />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Chief */}
        <Route path="/chief/home" element={<ChiefHome />} />
        <Route path="/chief/userregistration" element={<ChiefUserRegistration />} />

        {/* Admin */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/createuser" element={<AdminUserRegistration />} />

        {/* Staff */}
        <Route path="/staff/managerhome" element={<ManagerHome />} />
        <Route path="/staff/doctorhome" element={<DoctorHome />} />
        <Route path="/staff/caregiverhome" element={<CaregiverHome />} />
        <Route path="/staff/minorstaffhome" element={<MinorStaffHome />} />

        {/* Members */}
        <Route path="/members/familyhome" element={<FamilyHome />} />
        <Route path="/members/elderlyonsitehome" element={<ElderlyOnSiteHome />} />
        <Route path="/members/elderlyinhomehome" element={<ElderlyInHomeHome />} />

        {/* Elderly In-Home Navigation Pages */}
        <Route path="/members/elderlyinhome/dashboard" element={<Dashboard />} />
        <Route path="/members/elderlyinhome/mycare" element={<MyCare />} />
        <Route path="/members/elderlyinhome/dailysupport" element={<DailySupport />} />
        <Route path="/members/elderlyinhome/appointments" element={<Appointments />} />
        <Route path="/members/elderlyinhome/messages" element={<Messages />} />
        <Route path="/members/elderlyinhome/billing" element={<Billing />} />
        <Route path="/members/elderlyinhome/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;