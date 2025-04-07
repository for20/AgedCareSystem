import React, { useState, useEffect } from "react";
import { auth, db, secondaryAuth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/adminlayout";

const AdminUserRegistration = () => {
  const [role, setRole] = useState("manager");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData.role !== "admin") {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleCreateUser = async () => {
    if (role === "admin" || role === "chief") {
      setMessage("Admins cannot create other admins or chiefs.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const newUser = userCredential.user;

      await setDoc(doc(db, "users", newUser.uid), {
        role: role
      });

      setMessage(`${role.toUpperCase()} user created successfully.`);
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <AdminLayout>
      <h2>Admin - User Registration</h2>

      <div>
        <label>Email:</label><br />
        <input
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password:</label><br />
        <input
          type="password"
          placeholder="Enter a secure password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Role:</label><br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="manager">Manager</option>
          <option value="doctor">Doctor</option>
          <option value="caregiver">Caregiver</option>
          <option value="minor_staff">Minor Staff</option>
          <option value="elderly_on_site">Elderly (On-site)</option>
          <option value="elderly_in_home">Elderly (In-home)</option>
          <option value="family">Family Member</option>
        </select>
      </div>

      <button onClick={handleCreateUser}>Create User</button>
      <p>{message}</p>
    </AdminLayout>
  );
};

export default AdminUserRegistration;