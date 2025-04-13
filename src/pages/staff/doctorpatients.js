import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import StaffLayout from "../../components/stafflayout";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedUid, setSelectedUid] = useState("");
  const [form, setForm] = useState({
    diagnosis: "",
    doctor: "",
    caregiver: "",
    startDate: "",
    reviewDate: "",
    goals: ""
  });

  useEffect(() => {
    const fetchPatients = async () => {
      const snap = await getDocs(collection(db, "users"));
      const elderly = snap.docs
        .filter((doc) => doc.data().role === "elderly_in_home")
        .map((doc) => ({ uid: doc.id, ...doc.data() }));
      setPatients(elderly);
    };
    fetchPatients();
  }, []);

  const handleSelectPatient = async (uid) => {
    setSelectedUid(uid);
    const careRef = doc(db, "careplans", uid);
    const snap = await getDoc(careRef);
    if (snap.exists()) {
      setForm(snap.data());
    } else {
      setForm({
        diagnosis: "",
        doctor: "",
        caregiver: "",
        startDate: "",
        reviewDate: "",
        goals: ""
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!selectedUid) return alert("Select a patient first.");
    await setDoc(doc(db, "careplans", selectedUid), form);
    alert("Care plan updated!");
  };

  return (
    <StaffLayout>
      <h2>My Patients - Update Care Plans</h2>

      <h3>In-Home Elderly List</h3>
      {patients.map((p) => (
        <div key={p.uid}>
          <button onClick={() => handleSelectPatient(p.uid)}>
            {p.fullName || p.email || p.uid}
          </button>
        </div>
      ))}

      {selectedUid && (
        <div style={{ marginTop: "30px" }}>
          <h3>Edit Care Plan for UID: {selectedUid}</h3>
          <input name="diagnosis" placeholder="Diagnosis" value={form.diagnosis} onChange={handleChange} /><br />
          <input name="doctor" placeholder="Doctor" value={form.doctor} onChange={handleChange} /><br />
          <input name="caregiver" placeholder="Caregiver" value={form.caregiver} onChange={handleChange} /><br />
          <input name="startDate" type="date" value={form.startDate} onChange={handleChange} /><br />
          <input name="reviewDate" type="date" value={form.reviewDate} onChange={handleChange} /><br />
          <input name="goals" placeholder="Goals (comma separated)" value={form.goals} onChange={handleChange} /><br />
          <button onClick={handleUpdate}>Save Care Plan</button>
        </div>
      )}
    </StaffLayout>
  );
};

export default DoctorPatients;