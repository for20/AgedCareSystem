import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const InHomeElderlyLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainTabs = [
    { label: "Dashboard", path: "/members/elderlyinhome/dashboard" },
    { label: "My Care", path: "/members/elderlyinhome/mycare" },
    { label: "Daily Support", path: "/members/elderlyinhome/dailysupport" },
    { label: "Appointments", path: "/members/elderlyinhome/appointments" },
    { label: "Messages & Alerts", path: "/members/elderlyinhome/messages" },
    { label: "Billing & Funding", path: "/members/elderlyinhome/billing" },
    { label: "Settings & Support", path: "/members/elderlyinhome/settings" }
  ];

  const subTabs = {
    "/members/elderlyinhome/mycare": [
      "Care Plan",
      "Medication Schedule",
      "Clinical History",
      "Telehealth Appointments"
    ],
    "/members/elderlyinhome/dailysupport": [
      "Service Requests",
      "Meal Plans",
      "Activity Calendar",
      "Companion Services"
    ],
    "/members/elderlyinhome/appointments": [
      "Carer Visit Schedule",
      "Book a New Appointment",
      "Appointment History"
    ],
    "/members/elderlyinhome/messages": [
      "Chat with Care Team",
      "Chat with Family & Friends",
      "Emergency Contact Access"
    ],
    "/members/elderlyinhome/settings": [
      "Profile",
      "Help Center / FAQ",
      "Contact Support"
    ]
  };

  const currentSubNav = subTabs[location.pathname] || [];

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error) => alert("Logout failed: " + error.message));
    }
  };

  return (
    <div>
      {/* Top Nav */}
      <div>
        {mainTabs.map((tab) => (
          <button key={tab.label} onClick={() => navigate(tab.path)}>
            {tab.label}
          </button>
        ))}
        <button onClick={handleLogout}>Log Out</button>
      </div>

      {/* Sub Nav */}
      <div>
        {currentSubNav.map((label) => (
          <button key={label}>{label}</button>
        ))}
      </div>

      {/* Main Page Content */}
      <div>{children}</div>
    </div>
  );
};

export default InHomeElderlyLayout;