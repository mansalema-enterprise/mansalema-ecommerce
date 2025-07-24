import React from "react";
import "./CustomerService.css"; // Optional: for custom styling

const CustomerService = () => {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Customer Service</h1>
      <p className="policy-intro">
        We're here to help! Below you'll find useful information and how to contact us if you need assistance.
      </p>

      <ul className="policy-list">
        <li>
          <strong>Operating Hours:</strong> Monday – Friday, 9:00 AM – 5:00 PM
        </li>

        <li>
          <strong>Contact Email:</strong> <a href="mailto:info@mansalema.co.za">info@mansalema.co.za</a>
        </li>

        <li>
          <strong>Phone Number:</strong> +27 67 127 6191
        </li>

        <li>
          <strong>Order Inquiries:</strong> Need help tracking or changing your order? Please include your invoice number when contacting us.
        </li>

        <li>
          <strong>Returns & Exchanges:</strong> Refer to our <a href="/return-policy">Return Policy</a> page for steps on sending items back.
        </li>

        <li>
          <strong>Feedback:</strong> We value your input! Email us to let us know how we’re doing or suggest improvements.
        </li>
      </ul>
    </div>
  );
};

export default CustomerService;
