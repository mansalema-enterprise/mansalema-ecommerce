import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Mansalema Enterprise - Privacy Policy (South Africa)</h1>
      <p className="privacy-intro">
        At Mansalema Enterprise, we are committed to protecting your privacy and ensuring your personal
        information is handled in a safe and responsible manner in accordance with the Protection of
        Personal Information Act (POPIA) of South Africa.
      </p>

      <ul className="privacy-list">
        <li>
          <strong>Information Collection:</strong> We collect your name, contact details, billing/shipping addresses,
          and payment information when you make a purchase or register on our platform.
        </li>

        <li>
          <strong>Use of Information:</strong> Your information is used for order processing, customer service,
          delivery, and communication related to your account or orders.
        </li>

        <li>
          <strong>Data Protection:</strong> We use secure technologies and encryption to protect your personal
          data. Access to your information is restricted to authorized personnel only.
        </li>

        <li>
          <strong>Sharing Information:</strong> We do not sell your personal data. We may share it with
          third-party service providers strictly for delivery or payment processing.
        </li>

        <li>
          <strong>Your Rights:</strong> You have the right to access, correct, or delete your personal data. To do so,
          contact us at <a href="mailto:youremail@example.com">youremail@example.com</a>.
        </li>
      </ul>

      <p className="privacy-footer">
        By using our platform, you agree to our privacy policy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
