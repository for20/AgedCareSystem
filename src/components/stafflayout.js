import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const StaffLayout = ({ children }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setRole(userData.role);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      signOut(auth).then(() => navigate("/")).catch((err) => alert(err.message));
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const renderTabs = () => {
    if (role === "manager") {
      return (
        <>
          <button onClick={() => handleNavigate("/staff/managerhome")}>Home</button>
          <button onClick={() => handleNavigate("/staff/manager/rosters")}>Rosters</button>
          <button onClick={() => handleNavigate("/staff/manager/staff")}>Staff List</button>
        </>
      );
    } else if (role === "doctor") {
      return (
        <>
          <button onClick={() => handleNavigate("/staff/doctorhome")}>Home</button>
          <button onClick={() => handleNavigate("/staff/doctor/patients")}>Patients</button>
          <button onClick={() => handleNavigate("/staff/doctor/reports")}>Reports</button>
        </>
      );
    } else if (role === "caregiver") {
      return (
        <>
          <button onClick={() => handleNavigate("/staff/caregiverhome")}>Home</button>
          <button onClick={() => handleNavigate("/staff/caregiver/assigned")}>Assigned Elderly</button>
          <button onClick={() => handleNavigate("/staff/caregiver/logs")}>Log Activity</button>
        </>
      );
    } else if (role === "minor_staff") {
      return (
        <>
          <button onClick={() => handleNavigate("/staff/minorstaffhome")}>Home</button>
          <button onClick={() => handleNavigate("/staff/minorstaff/tasks")}>My Tasks</button>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>
        <h3>Staff Panel - {role}</h3>
        {renderTabs()}
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default StaffLayout;