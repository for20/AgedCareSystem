import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from "firebase/firestore";
import InHomeElderlyLayout from "../../../components/inhomeelderlylayout";

const Messages = () => {
  const [tab, setTab] = useState("family");
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      where("userId", "==", user.uid),
      where("toRole", "==", tab),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setChatLog(data);
    });

    return () => unsubscribe();
  }, [tab, user]);

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    const newMsg = {
      userId: user.uid,
      from: "member",
      toRole: tab,
      content: message,
      timestamp: Timestamp.now()
    };

    // Optimistically update local chat log
    setChatLog((prev) => [...prev, newMsg]);

    // Save to Firestore
    await addDoc(collection(db, "messages"), newMsg);

    setMessage("");
  };

  return (
    <InHomeElderlyLayout>
      <h2>Messages</h2>
      <p>Chat privately with your care team and family members.</p>

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setTab("family")}>Family</button>
        <button onClick={() => setTab("doctor")}>Doctor</button>
        <button onClick={() => setTab("caregiver")}>Caregiver</button>
      </div>

      {/* Chat Log */}
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "250px", overflowY: "auto" }}>
        {chatLog.length > 0 ? (
          chatLog.map((msg, i) => (
            <div key={i}>
              <strong>{msg.from === "member" ? "You" : msg.from}:</strong> {msg.content}
            </div>
          ))
        ) : (
          <p>No messages yet in this chat.</p>
        )}
      </div>

      {/* Input */}
      <div style={{ marginTop: "10px" }}>
        <input
          style={{ width: "75%", padding: "5px" }}
          value={message}
          placeholder={`Message your ${tab}`}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button style={{ padding: "6px 12px", marginLeft: "5px" }} onClick={handleSend}>
          Send
        </button>
      </div>
    </InHomeElderlyLayout>
  );
};

export default Messages;