import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import InHomeElderlyLayout from "../../../components/inhomeelderlylayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);
  const [careSummary, setCareSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate("/");
        return;
      }

      const uid = currentUser.uid;

      // Fetch user profile
      const userDoc = await getDoc(doc(db, "users", uid));
      setUserData(userDoc.data());

      // Fetch next appointment
      const appointmentsRef = collection(db, "appointments");
      const appointmentQuery = query(
        appointmentsRef,
        where("userId", "==", uid),
        orderBy("date", "asc"),
        limit(1)
      );
      const appointmentSnapshot = await getDocs(appointmentQuery);
      if (!appointmentSnapshot.empty) {
        setNextAppointment(appointmentSnapshot.docs[0].data());
      }

      // Fetch latest message
      const messagesRef = collection(db, "messages");
      const messageQuery = query(
        messagesRef,
        where("userId", "==", uid),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const messageSnapshot = await getDocs(messageQuery);
      if (!messageSnapshot.empty) {
        setLatestMessage(messageSnapshot.docs[0].data());
      }

      // Fetch care plan summary
      const careRef = doc(db, "careplans", uid);
      const careDoc = await getDoc(careRef);
      if (careDoc.exists()) {
        setCareSummary(careDoc.data());
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <InHomeElderlyLayout>
      <h2>Dashboard</h2>

      {userData && (
        <div>
          <p><strong>Welcome:</strong> {userData.fullName}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      )}

      {nextAppointment ? (
        <div>
          <h3>Next Appointment</h3>
          <p><strong>Date:</strong> {nextAppointment.date}</p>
          <p><strong>Time:</strong> {nextAppointment.time}</p>
          <p><strong>With:</strong> {nextAppointment.staffName}</p>
        </div>
      ) : (
        <p>No upcoming appointments.</p>
      )}

      {latestMessage ? (
        <div>
          <h3>Latest Message</h3>
          <p><strong>From:</strong> {latestMessage.from}</p>
          <p>{latestMessage.content}</p>
        </div>
      ) : (
        <p>No recent messages.</p>
      )}

      {careSummary ? (
        <div>
          <h3>Care Summary</h3>
          <p><strong>Diagnosis:</strong> {careSummary.diagnosis}</p>
          <p><strong>Medications:</strong> {careSummary.medications.join(", ")}</p>
          <p><strong>Doctor:</strong> {careSummary.doctor}</p>
        </div>
      ) : (
        <p>No care plan available.</p>
      )}
    </InHomeElderlyLayout>
  );
};

export default Dashboard;