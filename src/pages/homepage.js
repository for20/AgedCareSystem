import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Aged Care Management System</h1>
      <p>This is the home page for everyone — visitors, staff, and families.</p>
      <p>
        Want to sign up? <Link to="/signup">Go to Signup</Link>
      </p>
    </div>
  );
}

export default Home;