import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Enter your admin email"
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Admin Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>You are not an admin of the system? Return to the home page to find your login path.</p>
      <button onClick={() => navigate('/')}>Go back to Home</button>
    </div>
  );
};

export default AdminLogin;
