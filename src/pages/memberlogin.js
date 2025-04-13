import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import "../styles/login.css";

const MemberLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        alert("User role not found.");
        return;
      }

      const role = userDoc.data().role;

      if (role === "family") {
        navigate("/members/familyhome");
      } else if (role === "elderly_on_site") {
        navigate("/members/elderlyonsitehome");
      } else if (role === "elderly_in_home") {
        navigate("/members/elderlyinhome/dashboard");
      } else {
        alert("Access denied: You are not a member.");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Member Login</h2>
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
          <p>Not a member?</p>
          <button onClick={handleGoBack} className="back-btn">Go back to the main page</button>
        </div>
      </div>
    </div>
  );
};

export default MemberLogin;