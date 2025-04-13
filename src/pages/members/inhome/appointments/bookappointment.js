import React, { useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const BookAppointment = () => {
  const [form, setForm] = useState({
    staff: "",
    date: "",
    time: "",
    purpose: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "booked_appointments"), {
      userId: user.uid,
      ...form,
      status: "Pending"
    });

    setForm({ staff: "", date: "", time: "", purpose: "" });
    alert("Appointment request submitted!");
  };

  return (
    <InHomeElderlyLayout>
      <div className="container">
        <h2>Book a New Appointment</h2>
        <p>Fill out the form below to request an appointment with a doctor or caregiver.</p>

        <div>
          <label>Staff Name</label>
          <input
            name="staff"
            placeholder="Enter staff member's name"
            value={form.staff}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Time</label>
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Reason or Concern</label>
          <textarea
            name="purpose"
            placeholder="Briefly describe the reason"
            value={form.purpose}
            onChange={handleChange}
          />
        </div>

        <button onClick={handleSubmit}>Submit Request</button>
      </div>
    </InHomeElderlyLayout>
  );
};

export default BookAppointment;