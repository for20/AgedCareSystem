import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const MedicationSchedule = () => {
  const [meds, setMeds] = useState([]);
  const [form, setForm] = useState({});
  const [role, setRole] = useState("");
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const medsRef = collection(db, "medications");
    const medsQuery = query(medsRef, where("userId", "==", uid));
    onSnapshot(medsQuery, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMeds(data);
    });

    const userRef = doc(db, "users", uid);
    onSnapshot(userRef, (snap) => {
      if (snap.exists()) setRole(snap.data().role);
    });
  }, [uid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await addDoc(collection(db, "medications"), {
      userId: uid,
      ...form
    });
    setForm({});
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "medications", id));
  };

  return (
    <InHomeElderlyLayout>
      <h2>Medication Schedule</h2>
      <p>This section lists your prescribed medications and schedules. Only your doctor can manage these entries.</p>

      {role === "doctor" && (
        <div>
          <h4>Add Medication</h4>
          <input name="name" placeholder="Medication Name" value={form.name || ""} onChange={handleChange} />
          <input name="dosage" placeholder="Dosage" value={form.dosage || ""} onChange={handleChange} />
          <input name="time" placeholder="Time of Day" value={form.time || ""} onChange={handleChange} />
          <input name="frequency" placeholder="Frequency" value={form.frequency || ""} onChange={handleChange} />
          <input name="notes" placeholder="Notes" value={form.notes || ""} onChange={handleChange} />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}

      <h4>Current Medications</h4>
      {meds.map((med) => (
        <div key={med.id}>
          <p><strong>Name:</strong> {med.name}</p>
          <p><strong>Dosage:</strong> {med.dosage}</p>
          <p><strong>Time:</strong> {med.time}</p>
          <p><strong>Frequency:</strong> {med.frequency}</p>
          <p><strong>Notes:</strong> {med.notes}</p>
          {role === "doctor" && <button onClick={() => handleDelete(med.id)}>Delete</button>}
          <hr />
        </div>
      ))}

    </InHomeElderlyLayout>
  );
};

export default MedicationSchedule;