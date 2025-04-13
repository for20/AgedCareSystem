import React from "react";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const FAQ = () => {
  return (
    <InHomeElderlyLayout>
      <h2>Help Center & FAQ</h2>

      <h3>User Manual (In-Home Elderly)</h3>
      <p>Welcome to the ACMS Portal. This platform is built to help you manage your care, communicate with your team, and stay informed. Here's how you can use it:</p>

      <ul>
        <li><strong>Dashboard:</strong> Shows your personal profile, care summary, appointments, and latest messages.</li>
        <li><strong>My Care:</strong> Includes your care plan, medication schedule, clinical history, and telehealth appointments.</li>
        <li><strong>Daily Support:</strong> Request services (like cleaning or transport), check meal plans, and view your activity calendar.</li>
        <li><strong>Appointments:</strong> Schedule a visit or chat, view visit history, and upcoming bookings with caregivers and doctors.</li>
        <li><strong>Messages:</strong> Chat with your family, doctor, or caregiver in separate chat rooms.</li>
        <li><strong>Billing:</strong> View invoices and pay securely through our payment portal using credit/debit, bank transfer, or cash (OTP authentication).</li>
        <li><strong>Settings & Support:</strong> Access this help center, contact support, or update your personal profile.</li>
      </ul>

      <h3>Frequently Asked Questions (FAQs)</h3>

      <p><strong>Q1: How do I schedule an appointment?</strong><br />
        A: Go to Appointments → Book Appointment, select the staff, date, time, and describe your reason.</p>

      <p><strong>Q2: How can I update my contact or emergency details?</strong><br />
        A: Visit Settings → Profile and enter your updated details. Changes are saved automatically.</p>

      <p><strong>Q3: Who can see my health information?</strong><br />
        A: Only your assigned doctor and caregiver can view and update your care records.</p>

      <p><strong>Q4: How do I make a payment?</strong><br />
        A: Go to Billing, click "Pay Now" on any unpaid invoice, choose your method, and fill out the required fields.</p>

      <p><strong>Q5: I made a cash payment in person. What next?</strong><br />
        A: Choose "Cash" in the payment portal and enter the OTP code provided by your care center or HQ to confirm.</p>

      <p><strong>Q6: What happens when I send a service request?</strong><br />
        A: Your caregiver or manager will receive and review your request. You'll be notified when it's processed.</p>
    </InHomeElderlyLayout>
  );
};

export default FAQ;