import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      const userData = userDoc.data();

      // Allow access if role is "admin" or "chief"
      if (userData.role === "chief" && user.email === "chief@acms.com") {
        navigate("/chief/home"); // Chief goes to user creation page
      } else if (userData.role === "admin") {
        navigate("/admin/home"); // Normal admin route
      } else {
        alert("Access denied: You are not an admin.");
      }

    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <p>Need to go back?</p>
        <button onClick={handleGoBack}>Go back to the main page</button>
      </div>
    </div>
  );
};

export default AdminLogin;