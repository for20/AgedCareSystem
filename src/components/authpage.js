import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login user
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        // Signup user
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup Successful! Please login.");
        setIsLogin(true); // Switch to login after signup
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}  
          <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Signup here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;