import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          alert("Logout failed: " + error.message);
        });
    }
  };

  const handleGoToUserRegistration = () => {
    navigate("/admin/createuser");
  };

  const handleGoHome = () => {
    navigate("/admin/home");
  };

  return (
    <div>
      <div>
        <h3>Admin Panel</h3>
        <button onClick={handleGoHome}>Home</button>
        <button onClick={handleGoToUserRegistration}>User Registration</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;