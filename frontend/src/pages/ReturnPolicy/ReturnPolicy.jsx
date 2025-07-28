import React from "react";
import "./ReturnPolicy.css"; 

const ReturnPolicy = () => {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Mansalema Enterprise - Return Policy</h1>
      <p className="policy-intro">
        We want you to be satisfied with your purchase. If you're not happy, you may return eligible items under the following conditions:
      </p>

      <ul className="policy-list">
        <li>
          <strong>Return Window:</strong> Items must be returned within 14 days of delivery.
        </li>

        <li>
          <strong>Condition:</strong> Items must be unused, in original packaging, and in resellable condition.
        </li>

        <li>
          <strong>Non-Returnable Items:</strong> Personal care items, perishables, and items marked "Final Sale" cannot be returned.
        </li>

        <li>
          <strong>Process:</strong> To return an item, please email <a href="mailto:youremail@example.com">youremail@example.com</a> with your order number and reason for return. We will provide instructions and a return address.
        </li>

        <li>
          <strong>Refunds:</strong> Refunds are issued to the original payment method once the returned item is received and inspected.
        </li>

        <li>
          <strong>Return Shipping:</strong> Return shipping is the responsibility of the customer unless the item was defective or incorrect.
        </li>
      </ul>
    </div>
  );
};

export default ReturnPolicy;
