import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the ACM Portal</h1>
      <p>Please log in to continue</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        {/* Members Card */}
        <div>
          <h2>Members</h2>
          <p>
            If you're an elderly resident or a family member supporting a loved
            one, please log in through here to stay connected and informed.
          </p>
          <button onClick={() => navigate("/members")}>Members Login</button>
        </div>

        {/* Staff Card */}
        <div>
          <h2>Staff</h2>
          <p>
            If you’re a caregiver, doctor, or part of our dedicated support
            team, please log in here to manage care and daily operations.
          </p>
          <button onClick={() => navigate("/staff")}>Staff Login</button>
        </div>

        {/* Admin Card */}
        <div>
          <h2>Admin</h2>
          <p>
            If you are a system administrator, please log in here to access
            backend controls and manage system settings.
          </p>
          <button onClick={() => navigate("/admin")}>Admin Login</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
