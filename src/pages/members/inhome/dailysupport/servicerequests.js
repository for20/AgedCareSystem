import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    type: "",
    details: ""
  });

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const q = query(collection(db, "service_requests"), where("userId", "==", uid));
    onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setRequests(data);
    });
  }, [uid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, "service_requests"), {
      userId: uid,
      ...form,
      status: "Pending",
      createdAt: new Date().toISOString()
    });
    setForm({ type: "", details: "" });
  };

  return (
    <InHomeElderlyLayout>
      <div className="container">
        <h2>Service Requests</h2>
        <p>
          Use this section to request additional support services such as cleaning,
          transport, meal delivery, or laundry. Staff will receive your request
          and process it shortly.
        </p>

        <div>
          <h4>Request a Service</h4>
          <label>Service Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Laundry">Laundry</option>
            <option value="Meal Delivery">Meal Delivery</option>
            <option value="Transport">Transport</option>
          </select>

          <label>Description</label>
          <textarea
            name="details"
            placeholder="Describe your request..."
            value={form.details}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>Submit Request</button>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h4>My Requests</h4>
          {requests.length > 0 ? (
            requests.map((req, index) => (
              <div key={index}>
                <p><strong>Type:</strong> {req.type}</p>
                <p><strong>Details:</strong> {req.details}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <p><strong>Submitted:</strong> {new Date(req.createdAt).toLocaleString()}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No service requests submitted yet.</p>
          )}
        </div>
      </div>
    </InHomeElderlyLayout>
  );
};

export default ServiceRequests;