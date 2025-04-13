import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Footer from "./footer";

const InHomeElderlyLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainTabs = [
    { label: "Dashboard", path: "/members/elderlyinhome/dashboard" },
    { label: "My Care", path: "/members/elderlyinhome/mycare" },
    { label: "Daily Support", path: "/members/elderlyinhome/dailysupport" },
    { label: "Appointments", path: "/members/elderlyinhome/appointments" },
    { label: "Messages", path: "/members/elderlyinhome/messages" },
    { label: "Billing", path: "/members/elderlyinhome/billing" },
    { label: "Settings & Support", path: "/members/elderlyinhome/settings" }
  ];

  const subTabs = {
    "/members/elderlyinhome/mycare": [
      { label: "Care Plan", path: "/members/elderlyinhome/mycare/careplan" },
      { label: "Medication Schedule", path: "/members/elderlyinhome/mycare/medicationschedule" },
      { label: "Clinical History", path: "/members/elderlyinhome/mycare/clinicalhistory" }
    ],
    "/members/elderlyinhome/dailysupport": [
      { label: "Service Requests", path: "/members/elderlyinhome/dailysupport/requests" },
      { label: "Meal Plans", path: "/members/elderlyinhome/dailysupport/meals" },
      { label: "Activity Calendar", path: "/members/elderlyinhome/dailysupport/calendar" },
      { label: "Companion Services", path: "/members/elderlyinhome/dailysupport/companions" }
    ],
    "/members/elderlyinhome/appointments": [
      { label: "Carer Visit Schedule", path: "/members/elderlyinhome/appointments/carervisits" },
      { label: "Book a New Appointment", path: "/members/elderlyinhome/appointments/book" },
      { label: "Appointment History", path: "/members/elderlyinhome/appointments/history" }
    ],
    "/members/elderlyinhome/settings": [
      { label: "Profile", path: "/members/elderlyinhome/settings" },
      { label: "Help Center & FAQ", path: "/members/elderlyinhome/settings/faq" },
      { label: "Contact Support", path: "/members/elderlyinhome/settings/contact" }
    ]
  };

  const matchingKey = Object.keys(subTabs).find((basePath) =>
    location.pathname.startsWith(basePath)
  );
  const currentSubNav = matchingKey ? subTabs[matchingKey] : [];

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error) => alert("Logout failed: " + error.message));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Main Nav Bar */}
      <div className="navbar-main">
        {mainTabs.map((tab) => (
          <button
            key={tab.label}
            className={location.pathname.startsWith(tab.path) ? "active-tab" : ""}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {/* Sub Nav Bar */}
      {currentSubNav.length > 0 && (
        <div className="navbar-sub">
          {currentSubNav.map((tab) => (
            <button
              key={tab.label}
              className={location.pathname === tab.path ? "active-subtab" : ""}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Page content in styled flex wrapper */}
      <div className="page-content">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default InHomeElderlyLayout;