import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import InHomeElderlyLayout from "../../../components/inhomeelderlylayout";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [carePlan, setCarePlan] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      const uid = user.uid;

      // Realtime: User Profile
      const userRef = doc(db, "users", uid);
      onSnapshot(userRef, (snap) => {
        if (snap.exists()) setUserData(snap.data());
      });

      // Realtime: Care Plan
      const careRef = doc(db, "careplans", uid);
      onSnapshot(careRef, (snap) => {
        if (snap.exists()) setCarePlan(snap.data());
      });

      // Next Appointment
      try {
        const apptRef = collection(db, "appointments");
        const apptQuery = query(
          apptRef,
          where("userId", "==", uid),
          orderBy("date", "asc"),
          limit(1)
        );
        const apptSnap = await getDocs(apptQuery);
        if (!apptSnap.empty) {
          setAppointment(apptSnap.docs[0].data());
        }
      } catch (err) {
        console.warn("Appointment query failed (likely missing Firestore index):", err.message);
      }

      // Latest Message
      try {
        const msgRef = collection(db, "messages");
        const msgQuery = query(
          msgRef,
          where("userId", "==", uid),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const msgSnap = await getDocs(msgQuery);
        if (!msgSnap.empty) {
          setLatestMessage(msgSnap.docs[0].data());
        }
      } catch (err) {
        console.warn("Message query failed (likely missing Firestore index):", err.message);
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  return (
    <InHomeElderlyLayout>
      <h2>Welcome to Your Dashboard</h2>
      <p>This is your personal care hub. Here, you can see your health status, care summary, upcoming appointments, and recent messages. This dashboard updates automatically with the latest information.</p>

      <div>
        <h3>My Profile</h3>
        {userData ? (
          <>
            <p><strong>Name:</strong> {userData.fullName}</p>
            <p><strong>Email:</strong> {auth.currentUser?.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      <div>
        <h3>Care Summary</h3>
        {carePlan ? (
          <>
            <p><strong>Diagnosis:</strong> {carePlan.diagnosis}</p>
            <p><strong>Doctor:</strong> {carePlan.doctor}</p>
            <p><strong>Caregiver:</strong> {carePlan.caregiver}</p>
            <p><strong>Start Date:</strong> {carePlan.startDate}</p>
            <p><strong>Review Date:</strong> {carePlan.reviewDate}</p>
            <p><strong>Goals:</strong> {
              Array.isArray(carePlan.goals)
                ? carePlan.goals.join(", ")
                : carePlan.goals || "—"
            }</p>
          </>
        ) : (
          <p>No care plan has been assigned yet. Your doctor or caregiver will update this section soon.</p>
        )}
      </div>

      <div>
        <h3>Upcoming Appointment</h3>
        {appointment ? (
          <>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>With:</strong> {appointment.staffName}</p>
          </>
        ) : (
          <p>You don’t have any upcoming appointments scheduled.</p>
        )}
      </div>

      <div>
        <h3>Latest Message / Alert</h3>
        {latestMessage ? (
          <>
            <p><strong>From:</strong> {latestMessage.from}</p>
            <p>{latestMessage.content}</p>
          </>
        ) : (
          <p>No new messages or alerts at this time.</p>
        )}
      </div>

    </InHomeElderlyLayout>
  );
};

export default Dashboard;