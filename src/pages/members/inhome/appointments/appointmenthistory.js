import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const AppointmentHistory = () => {
  const [history, setHistory] = useState([]);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, "appointments"),
      where("userId", "==", uid),
      orderBy("date", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setHistory(data);
    });
  }, [uid]);

  return (
    <InHomeElderlyLayout>
      <div className="container">
        <h2>Appointment History</h2>
        <p>View all your past and confirmed appointments with staff.</p>

        {history.length ? (
          history.map((appt, i) => (
            <div key={i} style={{ backgroundColor: "#ffffff", padding: "15px", borderRadius: "10px", marginBottom: "15px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Reason:</strong> {appt.reason}</p>
              <p><strong>Status:</strong> {appt.status}</p>
            </div>
          ))
        ) : (
          <p>No appointment history found.</p>
        )}
      </div>
    </InHomeElderlyLayout>
  );
};

export default AppointmentHistory;