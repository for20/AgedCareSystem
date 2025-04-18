import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG7HDJ9URi78v_MY680FiOD3pG14a-sN4",
  authDomain: "agedcaresystem-e7426.firebaseapp.com",
  projectId: "agedcaresystem-e7426",
  storageBucket: "agedcaresystem-e7426.appspot.com",
  messagingSenderId: "872395610298",
  appId: "1:872395610298:web:8d786ec87508fb2008ca83",
  measurementId: "G-PKHW0XEXZK"
};

const app = initializeApp(firebaseConfig);

// Create a secondary app instance for user creation
const secondaryApp = initializeApp(firebaseConfig, "Secondary");

export const auth = getAuth(app);
export const db = getFirestore(app);
export const secondaryAuth = getAuth(secondaryApp);
export default app;