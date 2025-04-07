// src/createsuperadmin.js
import React, { useState } from "react";
import { auth, db } from "./firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const CreateChief = () => {
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    const email = "chief@acms.com";
    const password = "chief123";

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save role as "chief"
      await setDoc(doc(db, "users", user.uid), {
        role: "chief"
      });

      setMessage("✅ Chief account created successfully!");
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Create Chief Account</h2>
      <p>Click the button to create chief@acms.com</p>
      <button onClick={handleCreate}>Create Chief</button>
      <p>{message}</p>
    </div>
  );
};

export default CreateChief;