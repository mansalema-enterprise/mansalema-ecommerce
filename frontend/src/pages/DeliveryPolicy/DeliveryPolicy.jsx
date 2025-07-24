import React from "react";
import "./DeliveryPolicy.css"; // make sure this path is correct based on your folder structure

const DeliveryPolicy = () => {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Mansalema Enterprise - Delivery Policy</h1>
      <p className="policy-intro">
        We aim to provide fast and reliable delivery for every order.
      </p>

      <ul className="policy-list">
        <li>
          <strong>Delivery Areas:</strong> We deliver throughout South Africa. Some rural or remote areas may experience delays.
        </li>

        <li>
          <strong>Delivery Timeframes:</strong>
          <ul className="nested-list">
            <li>Standard delivery: 3–5 business days</li>
            <li>Express delivery: 1–2 business days (available in selected areas)</li>
          </ul>
        </li>

        <li>
          <strong>Fees:</strong> Delivery fees are calculated at checkout and vary based on weight, size, and location.
        </li>

        <li>
          <strong>Tracking:</strong> Once your order is shipped, you will receive a tracking number via email or SMS.
        </li>

        <li>
          <strong>Missed Deliveries:</strong> If no one is available to receive the delivery, the courier will attempt again or leave a notice with further instructions.
        </li>

        <li>
          <strong>Delays:</strong> While we strive to deliver on time, we are not liable for delays due to unforeseen circumstances such as strikes, weather, or supplier issues.
        </li>
      </ul>
    </div>
  );
};

export default DeliveryPolicy;
