import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

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
        navigate("/members/elderlyinhome/dashboard"); // FIXED: goes to the page with nav
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
    <div>
      <h2>Member Login</h2>
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
        <p>Not a member?</p>
        <button onClick={handleGoBack}>Go back to the main page</button>
      </div>
    </div>
  );
};

export default MemberLogin;