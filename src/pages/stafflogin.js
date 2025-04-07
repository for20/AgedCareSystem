import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";  // Correct import path

const StaffLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) throw new Error("User role not found");

      const userData = userDoc.data();
      if (userData.role !== "staff") {
        throw new Error("Unauthorized: You are not a staff member.");
      }

      // Redirect to the staff dashboard
      navigate("/staff/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  // Go back to main page (Welcome screen)
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Staff Login</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </form>

      {/* Go back to main page button */}
      <div style={{ marginTop: "20px" }}>
        <p>Not a staff member?</p>
        <button onClick={handleGoBack}>Go back to the main page</button>
      </div>
    </div>
  );
};

export default StaffLogin;