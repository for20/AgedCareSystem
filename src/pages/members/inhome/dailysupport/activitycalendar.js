import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const ActivityCalendar = () => {
  const [activities, setActivities] = useState([]);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const q = query(collection(db, "activities"), where("userId", "==", uid));
    onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setActivities(data);
    });
  }, [uid]);

  return (
    <InHomeElderlyLayout>
      <div className="container">
        <h2>Activity Calendar</h2>
        <p>
          This calendar includes upcoming social activities like movie nights,
          group walks, or games scheduled for the week. Ask your caregiver to
          register your attendance.
        </p>

        {activities.length > 0 ? (
          activities.map((act, i) => (
            <div key={i}>
              <p><strong>{act.date}</strong> – {act.title}</p>
              <p>{act.description}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No activities scheduled yet.</p>
        )}
      </div>
    </InHomeElderlyLayout>
  );
};

export default ActivityCalendar;