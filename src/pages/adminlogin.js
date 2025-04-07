import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";  // Correct import path

const AdminLogin = () => {
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
      if (userData.role !== "admin") {
        throw new Error("Unauthorized: You are not an admin.");
      }

      // Redirect to the admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
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
    </div>
  );
};

export default AdminLogin;
