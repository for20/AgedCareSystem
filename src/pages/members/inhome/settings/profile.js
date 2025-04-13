import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const ProfileSettings = () => {
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",

    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",

    diagnosis: "",
    allergies: "",
    medications: "",
    dietaryNeeds: "",

    preferences: "",
    language: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setForm(prev => ({
          ...prev,
          ...data
        }));
        setIsEditing(false);
      } else {
        setIsEditing(true); // if no data found, allow form entry
      }
      setLoading(false);
    };
    fetchData();
  }, [uid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!uid) return;
    await setDoc(doc(db, "users", uid), {
      ...form,
      role: "elderly_in_home"
    }, { merge: true });
    alert("Profile updated!");
    setIsEditing(false);
  };

  if (loading) return <InHomeElderlyLayout><p>Loading...</p></InHomeElderlyLayout>;

  return (
    <InHomeElderlyLayout>
      <h2>My Profile</h2>

      {!isEditing ? (
        <div>
          <button onClick={() => setIsEditing(true)}>Edit My Profile</button>

          <h3>1. Personal Information</h3>
          <p><strong>Full Name:</strong> {form.fullName}</p>
          <p><strong>DOB:</strong> {form.dateOfBirth}</p>
          <p><strong>Gender:</strong> {form.gender}</p>

          <h3>2. Contact Details</h3>
          <p><strong>Phone:</strong> {form.phone}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Address:</strong> {form.address}</p>

          <h3>3. Emergency Contact</h3>
          <p><strong>Name:</strong> {form.emergencyName}</p>
          <p><strong>Relationship:</strong> {form.emergencyRelation}</p>
          <p><strong>Phone:</strong> {form.emergencyPhone}</p>

          <h3>4. Medical & Care Info</h3>
          <p><strong>Diagnosis:</strong> {form.diagnosis}</p>
          <p><strong>Allergies:</strong> {form.allergies}</p>
          <p><strong>Medications:</strong> {form.medications}</p>
          <p><strong>Dietary Needs:</strong> {form.dietaryNeeds}</p>

          <h3>5. Other Preferences</h3>
          <p><strong>Preferred Language:</strong> {form.language}</p>
          <p><strong>Notes:</strong> {form.preferences}</p>
        </div>
      ) : (
        <div>
          <h3>1. Personal Information</h3>
          <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} /><br />
          <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} /><br />
          <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} /><br />

          <h3>2. Contact Details</h3>
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} /><br />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
          <input name="address" placeholder="Residential Address" value={form.address} onChange={handleChange} /><br />

          <h3>3. Emergency Contact</h3>
          <input name="emergencyName" placeholder="Contact Name" value={form.emergencyName} onChange={handleChange} /><br />
          <input name="emergencyRelation" placeholder="Relationship" value={form.emergencyRelation} onChange={handleChange} /><br />
          <input name="emergencyPhone" placeholder="Contact Phone" value={form.emergencyPhone} onChange={handleChange} /><br />

          <h3>4. Medical & Care Info</h3>
          <input name="diagnosis" placeholder="Medical Diagnosis" value={form.diagnosis} onChange={handleChange} /><br />
          <input name="allergies" placeholder="Allergies" value={form.allergies} onChange={handleChange} /><br />
          <input name="medications" placeholder="Medications" value={form.medications} onChange={handleChange} /><br />
          <input name="dietaryNeeds" placeholder="Dietary Requirements" value={form.dietaryNeeds} onChange={handleChange} /><br />

          <h3>5. Other Preferences</h3>
          <input name="language" placeholder="Preferred Language" value={form.language} onChange={handleChange} /><br />
          <textarea name="preferences" placeholder="Other Notes or Preferences" value={form.preferences} onChange={handleChange} /><br />

          <button onClick={handleSave}>Save Details</button>
        </div>
      )}
    </InHomeElderlyLayout>
  );
};

export default ProfileSettings;