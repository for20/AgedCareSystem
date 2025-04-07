// src/CreateAdmin.js
import React, { useState } from "react";
import { auth, db } from "./firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const CreateAdmin = () => {
  const [email, setEmail] = useState("superadmin@acms.com");
  const [password, setPassword] = useState("admin1234");
  const [message, setMessage] = useState("");

  const handleCreateAdmin = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        role: "admin",
        subRole: "superadmin"
      });

      setMessage("✅ Admin account created successfully.");
    } catch (error) {
      console.error("Error creating admin:", error);
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Create Admin Account</h2>
      <p>Email and password are hardcoded for now:</p>
      <p><b>{email}</b> / <b>{password}</b></p>
      <button onClick={handleCreateAdmin}>Create Admin</button>
      <p>{message}</p>
    </div>
  );
};

export default CreateAdmin;
