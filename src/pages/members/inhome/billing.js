import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  Timestamp
} from "firebase/firestore";
import InHomeElderlyLayout from "../../../components/inhomeelderlylayout";

const Billing = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("Credit/Debit Card");
  const [formData, setFormData] = useState({});
  const [showPortal, setShowPortal] = useState(false);

  const user = auth.currentUser;

  const FAKE_BSB = "062000";
  const FAKE_ACC = "12345678";

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "invoices"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvoices(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleStartPayment = (invoice) => {
    setSelectedInvoice(invoice);
    setSelectedMethod("Credit/Debit Card");
    setFormData({});
    setShowPortal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPayment = async () => {
    // Validate required fields by method
    if (selectedMethod === "Credit/Debit Card") {
      if (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvv) {
        alert("Please complete all card details.");
        return;
      }
    } else if (selectedMethod === "Bank Transfer") {
      if (formData.bsb !== FAKE_BSB || formData.accountNumber !== FAKE_ACC) {
        alert("BSB or Account Number does not match. Please verify.");
        return;
      }
    } else if (selectedMethod === "Cash") {
      if (!formData.otp || formData.otp.length !== 6) {
        alert("Invalid OTP code. Please enter the 6-digit code from HQ.");
        return;
      }
    }

    const ref = doc(db, "invoices", selectedInvoice.id);
    await updateDoc(ref, {
      status: "paid",
      paidAt: Timestamp.now(),
      method: selectedMethod
    });

    await addDoc(collection(db, "payments"), {
      userId: user.uid,
      invoiceId: selectedInvoice.id,
      amount: selectedInvoice.amount,
      method: selectedMethod,
      paidAt: Timestamp.now()
    });

    alert("Payment successful.");
    setShowPortal(false);
    setSelectedInvoice(null);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "Credit/Debit Card":
        return (
          <>
            <input name="cardName" placeholder="Cardholder Name" onChange={handleFormChange} />
            <input name="cardNumber" placeholder="Card Number" maxLength={16} onChange={handleFormChange} />
            <input name="expiry" placeholder="MM/YY" maxLength={5} onChange={handleFormChange} />
            <input name="cvv" placeholder="CVV" maxLength={4} onChange={handleFormChange} />
          </>
        );
      case "Bank Transfer":
        return (
          <>
            <p><strong>BSB:</strong> {FAKE_BSB} | <strong>Account No:</strong> {FAKE_ACC}</p>
            <p>Please re-enter the details below to confirm:</p>
            <input name="bsb" placeholder="Enter BSB" maxLength={6} onChange={handleFormChange} />
            <input name="accountNumber" placeholder="Enter Account Number" maxLength={12} onChange={handleFormChange} />
          </>
        );
      case "Cash":
        return (
          <>
            <p>Please enter the OTP code given by HQ after cash submission.</p>
            <input name="otp" placeholder="Enter OTP Code" maxLength={6} onChange={handleFormChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <InHomeElderlyLayout>
      <h2>Billing & Payment</h2>

      <h3>Unpaid Invoices</h3>
      {invoices.filter(i => i.status !== "paid").length === 0 ? (
        <p>All invoices are paid.</p>
      ) : (
        invoices.filter(i => i.status !== "paid").map((inv) => (
          <div key={inv.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p><strong>Description:</strong> {inv.description}</p>
            <p><strong>Amount:</strong> ${inv.amount}</p>
            <p><strong>Issued:</strong> {new Date(inv.issuedAt.seconds * 1000).toLocaleDateString()}</p>
            <button onClick={() => handleStartPayment(inv)}>Pay Now</button>
          </div>
        ))
      )}

      {showPortal && selectedInvoice && (
        <div style={{ border: "2px solid green", padding: "20px", marginTop: "20px", background: "#f3fff3" }}>
          <h3>Payment Portal</h3>
          <p><strong>Paying:</strong> {selectedInvoice.description} — ${selectedInvoice.amount}</p>

          <label>Payment Method:</label>
          <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
            <option value="Credit/Debit Card">Credit/Debit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash (with OTP)</option>
          </select>

          <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {renderPaymentForm()}
          </div>

          <button style={{ marginTop: "15px" }} onClick={handleConfirmPayment}>Process Payment</button>
        </div>
      )}

      <h3 style={{ marginTop: "40px" }}>Payment History</h3>
      {invoices.filter(i => i.status === "paid").length === 0 ? (
        <p>No past payments found.</p>
      ) : (
        invoices.filter(i => i.status === "paid").map((inv) => (
          <div key={inv.id}>
            <p><strong>{inv.description}</strong> — ${inv.amount} via {inv.method}</p>
            <p>Paid on: {new Date(inv.paidAt?.seconds * 1000).toLocaleString()}</p>
            <hr />
          </div>
        ))
      )}
    </InHomeElderlyLayout>
  );
};

export default Billing;