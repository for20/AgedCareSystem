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

const MealPlans = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ day: "", meals: "" });
  const [role, setRole] = useState("");
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const q = query(collection(db, "mealplans"), where("userId", "==", uid));
    onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setPlans(data);
    });

    onSnapshot(doc(db, "users", uid), (snap) => {
      if (snap.exists()) setRole(snap.data().role);
    });
  }, [uid]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await addDoc(collection(db, "mealplans"), {
      userId: uid,
      ...form
    });
    setForm({ day: "", meals: "" });
  };

  return (
    <InHomeElderlyLayout>
      <div className="container">
        <h2>Meal Plans</h2>
        <p>
          This section shows your weekly meal schedule. Caregivers can update
          this with upcoming meals for each day.
        </p>

        {role === "caregiver" && (
          <div>
            <label>Day</label>
            <input
              name="day"
              placeholder="e.g. Monday"
              value={form.day}
              onChange={handleChange}
            />

            <label>Meals</label>
            <input
              name="meals"
              placeholder="e.g. Breakfast: Oats, Lunch: Rice & Curry"
              value={form.meals}
              onChange={handleChange}
            />

            <button onClick={handleSubmit}>Add</button>
          </div>
        )}

        <div>
          <h3>Weekly Schedule</h3>
          {plans.length > 0 ? (
            plans.map((p, i) => (
              <div key={i}>
                <p>
                  <strong>{p.day}</strong>: {p.meals}
                </p>
              </div>
            ))
          ) : (
            <p>No meal plans added yet.</p>
          )}
        </div>
      </div>
    </InHomeElderlyLayout>
  );
};

export default MealPlans;