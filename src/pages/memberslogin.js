import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MembersLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // TODO: You can add role checking here
      alert("Login successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Members Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Member Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Not a member of the system? You might want to return to the home page.</p>
      <button onClick={() => navigate('/')}>Go back to Home</button>
    </div>
  );
};

export default MembersLogin;
