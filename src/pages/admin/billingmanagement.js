import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  Timestamp
} from "firebase/firestore";
import AdminLayout from "../../components/adminlayout";

const BillingManagement = () => {
  const [users, setUsers] = useState([]);
  const [invoiceForm, setInvoiceForm] = useState({
    userId: "",
    description: "",
    amount: ""
  });
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.role === "elderly_in_home");
      setUsers(data);
    };

    const unsubInvoices = onSnapshot(collection(db, "invoices"), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvoices(data);
    });

    fetchUsers();
    return () => unsubInvoices();
  }, []);

  const handleChange = (e) => {
    setInvoiceForm({ ...invoiceForm, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await addDoc(collection(db, "invoices"), {
      ...invoiceForm,
      amount: parseFloat(invoiceForm.amount),
      status: "unpaid",
      issuedAt: Timestamp.now()
    });

    setInvoiceForm({ userId: "", description: "", amount: "" });
    alert("Invoice issued.");
  };

  return (
    <AdminLayout>
      <h2>Billing Management</h2>
      <h4>Issue Invoice</h4>
      <select name="userId" value={invoiceForm.userId} onChange={handleChange}>
        <option value="">Select Elderly</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.fullName || u.email || u.id}
          </option>
        ))}
      </select><br />
      <input name="description" placeholder="Description" value={invoiceForm.description} onChange={handleChange} /><br />
      <input name="amount" placeholder="Amount ($)" value={invoiceForm.amount} onChange={handleChange} /><br />
      <button onClick={handleCreate}>Create Invoice</button>

      <h4 style={{ marginTop: 30 }}>All Invoices</h4>
      {invoices.map((i) => (
        <div key={i.id}>
          <p><strong>{i.description}</strong> - ${i.amount} - {i.status.toUpperCase()}</p>
          <p>User: {i.userId}</p>
          <p>Issued: {new Date(i.issuedAt.seconds * 1000).toLocaleString()}</p>
          {i.status === "paid" && (
            <p>Paid: {new Date(i.paidAt?.seconds * 1000).toLocaleString()} via {i.method}</p>
          )}
          <hr />
        </div>
      ))}
    </AdminLayout>
  );
};

export default BillingManagement;