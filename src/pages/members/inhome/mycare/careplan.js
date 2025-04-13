import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const CarePlan = () => {
  const [careData, setCareData] = useState(null);
  const [form, setForm] = useState({});
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
      return;
    }

    const uid = user.uid;
    const careRef = doc(db, "careplans", uid);
    const userRef = doc(db, "users", uid);

    onSnapshot(careRef, (snap) => {
      if (snap.exists()) {
        setCareData(snap.data());
        setForm(snap.data());
      }
    });

    onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        setRole(snap.data().role);
      }
    });
  }, [navigate]);

  const isEditable = role === "doctor" || role === "caregiver";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await setDoc(doc(db, "careplans", auth.currentUser.uid), form);
  };

  return (
    <InHomeElderlyLayout>
      <h2>Care Plan</h2>
      <p>This section shows your medical care plan, managed by your assigned doctor and caregiver. You’ll be able to see updates to your diagnosis, goals, and care team as they happen.</p>

      {isEditable && (
        <div>
          <h4>Update Care Plan</h4>
          <input name="diagnosis" placeholder="Diagnosis" value={form.diagnosis || ""} onChange={handleChange} />
          <input name="doctor" placeholder="Doctor" value={form.doctor || ""} onChange={handleChange} />
          <input name="caregiver" placeholder="Caregiver" value={form.caregiver || ""} onChange={handleChange} />
          <input name="startDate" type="date" value={form.startDate || ""} onChange={handleChange} />
          <input name="reviewDate" type="date" value={form.reviewDate || ""} onChange={handleChange} />
          <input name="goals" placeholder="Goals (comma separated)" value={form.goals || ""} onChange={handleChange} />
          <button onClick={handleSubmit}>Save Plan</button>
        </div>
      )}

      {careData ? (
        <div>
          <h4>Current Care Plan</h4>
          <p><strong>Diagnosis:</strong> {careData.diagnosis}</p>
          <p><strong>Doctor:</strong> {careData.doctor}</p>
          <p><strong>Caregiver:</strong> {careData.caregiver}</p>
          <p><strong>Start Date:</strong> {careData.startDate}</p>
          <p><strong>Review Date:</strong> {careData.reviewDate}</p>
          <p><strong>Goals:</strong> {careData.goals}</p>
        </div>
      ) : (
        <p>No care plan assigned yet.</p>
      )}

    </InHomeElderlyLayout>
  );
};

export default CarePlan;