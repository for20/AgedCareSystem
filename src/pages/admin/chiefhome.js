import React, { useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import ChiefLayout from "../../components/chieflayout";

const ChiefHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== "chief@acms.com") {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <ChiefLayout>
      <h2>Welcome Chief</h2>
      <p>This is your chief home page.</p>
    </ChiefLayout>
  );
};

export default ChiefHome;