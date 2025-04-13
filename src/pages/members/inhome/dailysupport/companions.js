import React from "react";
import InHomeElderlyLayout from "../../../../components/inhomeelderlylayout";

const CompanionServices = () => {
  return (
    <InHomeElderlyLayout>
      <div className="container">
        <h2>Companion Services</h2>
        <p>
          We offer companionship services such as home visits, reading support,
          or outdoor walks to ensure your emotional and social well-being.
          Talk to your caregiver if you’d like to schedule a companion visit.
        </p>

        <ul>
          <li>Daily check-ins (in-person or video)</li>
          <li>Assistance with hobbies or games</li>
          <li>Accompaniment to appointments or short walks</li>
          <li>Story sharing, book reading, and emotional support</li>
        </ul>

        <p>
          <strong>Need this service?</strong> Submit a request under the{" "}
          <em>Service Requests</em> tab or notify your caregiver directly.
        </p>
      </div>
    </InHomeElderlyLayout>
  );
};

export default CompanionServices;