import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public
import Welcome from "./pages/welcome";
import MemberLogin from "./pages/memberlogin";
import StaffLogin from "./pages/stafflogin";
import AdminLogin from "./pages/adminlogin";

// Admin
import AdminHome from "./pages/admin/adminhome";
import AdminUserRegistration from "./pages/admin/adminuserregistration";
import BillingManagement from "./pages/admin/billingmanagement";

// Chief
import ChiefHome from "./pages/admin/chiefhome";
import ChiefUserRegistration from "./pages/admin/chiefuserregistration";

// Staff Dashboards
import ManagerHome from "./pages/staff/managerhome";
import DoctorHome from "./pages/staff/doctorhome";
import CaregiverHome from "./pages/staff/caregiverhome";
import MinorStaffHome from "./pages/staff/minorstaffhome";
import DoctorPatients from "./pages/staff/doctorpatients"; // If needed

// Member Dashboards
import FamilyHome from "./pages/members/familyhome";
import ElderlyOnSiteHome from "./pages/members/elderlyonsitehome";
import ElderlyInHomeHome from "./pages/members/elderlyinhomehome";

// In-Home Elderly Main Pages
import Dashboard from "./pages/members/inhome/dashboard";
import MyCare from "./pages/members/inhome/mycare";
import DailySupport from "./pages/members/inhome/dailysupport";
import Appointments from "./pages/members/inhome/appointments";
import Messages from "./pages/members/inhome/messages";
import Billing from "./pages/members/inhome/billing";
import Settings from "./pages/members/inhome/settings";

// Settings & Support Subpages
import FAQ from "./pages/members/inhome/settings/faq";
import ContactSupport from "./pages/members/inhome/settings/contactsupport";

// My Care Subpages
import CarePlan from "./pages/members/inhome/mycare/careplan";
import MedicationSchedule from "./pages/members/inhome/mycare/medicationschedule";
import ClinicalHistory from "./pages/members/inhome/mycare/clinicalhistory";

// Daily Support Subpages
import ServiceRequests from "./pages/members/inhome/dailysupport/servicerequests";
import MealPlans from "./pages/members/inhome/dailysupport/mealplans";
import ActivityCalendar from "./pages/members/inhome/dailysupport/activitycalendar";
import CompanionServices from "./pages/members/inhome/dailysupport/companions";

// Appointment Subpages
import CarerVisits from "./pages/members/inhome/appointments/carervisits";
import BookAppointment from "./pages/members/inhome/appointments/bookappointment";
import AppointmentHistory from "./pages/members/inhome/appointments/appointmenthistory";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Welcome />} />
        <Route path="/members" element={<MemberLogin />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/createuser" element={<AdminUserRegistration />} />
        <Route path="/admin/billing" element={<BillingManagement />} />

        {/* Chief */}
        <Route path="/chief/home" element={<ChiefHome />} />
        <Route path="/chief/userregistration" element={<ChiefUserRegistration />} />

        {/* Staff Dashboards */}
        <Route path="/staff/managerhome" element={<ManagerHome />} />
        <Route path="/staff/doctorhome" element={<DoctorHome />} />
        <Route path="/staff/caregiverhome" element={<CaregiverHome />} />
        <Route path="/staff/minorstaffhome" element={<MinorStaffHome />} />
        <Route path="/staff/doctor/patients" element={<DoctorPatients />} />

        {/* Members */}
        <Route path="/members/familyhome" element={<FamilyHome />} />
        <Route path="/members/elderlyonsitehome" element={<ElderlyOnSiteHome />} />
        <Route path="/members/elderlyinhomehome" element={<ElderlyInHomeHome />} />

        {/* In-Home Elderly Main Pages */}
        <Route path="/members/elderlyinhome/dashboard" element={<Dashboard />} />
        <Route path="/members/elderlyinhome/mycare" element={<MyCare />} />
        <Route path="/members/elderlyinhome/dailysupport" element={<DailySupport />} />
        <Route path="/members/elderlyinhome/appointments" element={<Appointments />} />
        <Route path="/members/elderlyinhome/messages" element={<Messages />} />
        <Route path="/members/elderlyinhome/billing" element={<Billing />} />
        <Route path="/members/elderlyinhome/settings" element={<Settings />} />
        <Route path="/members/elderlyinhome/settings/faq" element={<FAQ />} />
        <Route path="/members/elderlyinhome/settings/contact" element={<ContactSupport />} />

        {/* My Care Subpages */}
        <Route path="/members/elderlyinhome/mycare/careplan" element={<CarePlan />} />
        <Route path="/members/elderlyinhome/mycare/medicationschedule" element={<MedicationSchedule />} />
        <Route path="/members/elderlyinhome/mycare/clinicalhistory" element={<ClinicalHistory />} />

        {/* Daily Support Subpages */}
        <Route path="/members/elderlyinhome/dailysupport/requests" element={<ServiceRequests />} />
        <Route path="/members/elderlyinhome/dailysupport/meals" element={<MealPlans />} />
        <Route path="/members/elderlyinhome/dailysupport/calendar" element={<ActivityCalendar />} />
        <Route path="/members/elderlyinhome/dailysupport/companions" element={<CompanionServices />} />

        {/* Appointment Subpages */}
        <Route path="/members/elderlyinhome/appointments/carervisits" element={<CarerVisits />} />
        <Route path="/members/elderlyinhome/appointments/book" element={<BookAppointment />} />
        <Route path="/members/elderlyinhome/appointments/history" element={<AppointmentHistory />} />

      </Routes>
    </Router>
  );
};

export default App;