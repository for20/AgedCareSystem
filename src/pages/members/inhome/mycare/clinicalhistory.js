import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc
} from "firebase/firestore";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const ClinicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({});
  const [role, setRole] = useState("");
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const q = query(collection(db, "clinical_history"), where("userId", "==", uid));
    onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setHistory(data);
    });

    const userRef = doc(db, "users", uid);
    onSnapshot(userRef, (snap) => {
      if (snap.exists()) setRole(snap.data().role);
    });
  }, [uid]);

  const isEditable = role === "doctor" || role === "caregiver";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await addDoc(collection(db, "clinical_history"), {
      userId: uid,
      ...form
    });
    setForm({});
  };

  return (
    <InHomeElderlyLayout>
      <h2>Clinical History</h2>
      <p>This section keeps a timeline of your medical history — including past diagnoses, hospital visits, surgeries, and allergies. Only medical staff can log new events.</p>

      {isEditable && (
        <div>
          <h4>Add Medical Event</h4>
          <input name="type" placeholder="Event Type" value={form.type || ""} onChange={handleChange} />
          <input name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} />
          <input name="date" type="date" value={form.date || ""} onChange={handleChange} />
          <input name="notes" placeholder="Notes" value={form.notes || ""} onChange={handleChange} />
          <button onClick={handleAdd}>Add to History</button>
        </div>
      )}

      <h4>History Log</h4>
      {history.map((entry, index) => (
        <div key={index}>
          <p><strong>Type:</strong> {entry.type}</p>
          <p><strong>Description:</strong> {entry.description}</p>
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Notes:</strong> {entry.notes}</p>
          <hr />
        </div>
      ))}

    </InHomeElderlyLayout>
  );
};

export default ClinicalHistory;