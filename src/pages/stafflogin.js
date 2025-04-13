import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import "../styles/login.css";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) throw new Error("User role not found");

      const userData = userDoc.data();
      const role = userData.role;

      if (role === "manager") {
        navigate("/staff/managerhome");
      } else if (role === "doctor") {
        navigate("/staff/doctorhome");
      } else if (role === "caregiver") {
        navigate("/staff/caregiverhome");
      } else if (role === "minor_staff") {
        navigate("/staff/minorstaffhome");
      } else {
        throw new Error("Access denied: You are not a staff member.");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Staff Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="login-footer">
          <p>Not a staff member?</p>
          <button onClick={handleGoBack} className="back-btn">Go back to the main page</button>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;