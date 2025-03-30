import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0", borderBottom: "1px solid #ccc" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li><Link to="/">Home</Link></li>
        {!user && <li><Link to="/signup">Signup</Link></li>}
        {user && <li><button onClick={handleLogout}>Logout</button></li>}
      </ul>
    </nav>
  );
}

export default Navbar;