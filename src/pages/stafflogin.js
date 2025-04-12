import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

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
    <div>
      <h2>Staff Login</h2>
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

      <div>
        <p>Not a staff member?</p>
        <button onClick={handleGoBack}>Go back to the main page</button>
      </div>
    </div>
  );
};

export default StaffLogin;