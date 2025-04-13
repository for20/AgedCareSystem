import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-header">
        <h1>Welcome to ACMS</h1>
        <p className="subtitle">Management Made Easy</p>
      </div>

      <div className="role-selection">
        {/* Members */}
        <div className="role-box">
          <h2>Members</h2>
          <p>
            Elderly residents and family members can access personalized care updates,
            schedules, and support tools from here.
          </p>
          <div className="btn-container">
            <button onClick={() => navigate("/members")}>Login</button>
          </div>
        </div>

        {/* Staff */}
        <div className="role-box">
          <h2>Staff</h2>
          <p>
            Doctors, caregivers, and support staff can log in to manage daily tasks,
            appointments, and service coordination.
          </p>
          <div className="btn-container">
            <button onClick={() => navigate("/staff")}>Login</button>
          </div>
        </div>

        {/* Admin */}
        <div className="role-box">
          <h2>Admin</h2>
          <p>
            System administrators can access backend controls, user registrations,
            and data management panels securely here.
          </p>
          <div className="btn-container">
            <button onClick={() => navigate("/admin")}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;