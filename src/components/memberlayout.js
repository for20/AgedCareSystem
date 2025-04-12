import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const MemberLayout = ({ children }) => {
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
      signOut(auth)
        .then(() => navigate("/"))
        .catch((err) => alert(err.message));
    }
  };

  const handleGoHome = () => {
    if (role === "family") {
      navigate("/members/familyhome");
    } else if (role === "elderly_on_site") {
      navigate("/members/elderlyonsitehome");
    } else if (role === "elderly_in_home") {
      navigate("/members/elderlyinhomehome");
    }
  };

  const renderTabs = () => {
    if (role === "family") {
      return (
        <>
          <button onClick={() => navigate("/members/familyhome")}>Home</button>
          <button onClick={() => navigate("/members/family/schedule")}>Schedule</button>
          <button onClick={() => navigate("/members/family/messages")}>Messages</button>
        </>
      );
    } else if (role === "elderly_on_site" || role === "elderly_in_home") {
      return (
        <>
          <button onClick={handleGoHome}>Home</button>
          <button onClick={() => navigate("/members/elderly/services")}>Services</button>
          <button onClick={() => navigate("/members/elderly/health")}>Health</button>
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <div>
        <h3>Member Panel - {role}</h3>
        {renderTabs()}
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MemberLayout;