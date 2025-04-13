import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const CarerVisitSchedule = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;

      const q = query(
        collection(db, "carer_visits"),
        where("userId", "==", user.uid)
      );

      onSnapshot(q, (snap) => {
        const data = snap.docs.map((doc) => doc.data());
        setVisits(data);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <InHomeElderlyLayout>
      <div className="container">
        <h2>Carer Visit Schedule</h2>
        <p>This section displays your upcoming carer visits automatically scheduled by the care team.</p>

        {visits.length === 0 ? (
          <p>No upcoming visits found.</p>
        ) : (
          visits.map((v, i) => (
            <div key={i}>
              <p><strong>Date:</strong> {v.date}</p>
              <p><strong>Time:</strong> {v.time}</p>
              <p><strong>Carer:</strong> {v.carer}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </InHomeElderlyLayout>
  );
};

export default CarerVisitSchedule;