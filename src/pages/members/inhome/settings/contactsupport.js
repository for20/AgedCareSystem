import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../../../../firebase/firebase";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const ContactSupport = () => {
  const [form, setForm] = useState({
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user || !form.subject || !form.message) {
      alert("Please complete all fields.");
      return;
    }

    await addDoc(collection(db, "supportMessages"), {
      fromUserId: user.uid,
      toEmail: "hrmanager@acms.com",
      subject: form.subject,
      message: form.message,
      sentAt: Timestamp.now()
    });

    alert("Message sent to hrmanager@acms.com.");
    setForm({ subject: "", message: "" });
  };

  return (
    <InHomeElderlyLayout>
      <h2>Contact Support</h2>
      <p>If you have any questions or issues, please reach out to our support team.</p>

      <h3>Call Us</h3>
      <p>Phone: 1300 555 888</p>
      <button onClick={() => window.open("tel:1300555888")}>Call Now</button>

      <h3>Send a Message</h3>
      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="message"
        placeholder="Your message..."
        value={form.message}
        onChange={handleChange}
        rows={5}
        style={{ width: "100%", marginTop: "10px" }}
      />
      <br />
      <button onClick={handleSubmit}>Send to HR Manager</button>
    </InHomeElderlyLayout>
  );
};

export default ContactSupport;