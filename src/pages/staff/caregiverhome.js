import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import StaffLayout from "../../components/stafflayout";

const CaregiverHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData.role !== "caregiver") {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <StaffLayout>
      <h2>Welcome, Caregiver</h2>
      <p>This is your dashboard.</p>
    </StaffLayout>
  );
};

export default CaregiverHome;