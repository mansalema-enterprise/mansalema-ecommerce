import React from "react";
import "./PurchasePolicy.css"; // adjust path if needed

const PurchasePolicy = () => {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Mansalema Enterprise - Purchase Policy</h1>
      <p className="policy-intro">
        Welcome to our e-commerce platform. By making a purchase, you agree to the following terms:
      </p>

      <ul className="policy-list">
        <li>
          <strong>Product Availability:</strong> All products listed are subject to availability. We reserve the right
          to cancel any orders if a product is out of stock.
        </li>

        <li>
          <strong>Pricing:</strong> Prices are listed in South African Rand (ZAR) and include VAT unless otherwise stated.
        </li>

        <li>
          <strong>Payment:</strong> We accept payments via credit/debit card, EFT, and supported digital wallets.
          Orders are only processed once payment is confirmed.
        </li>

        <li>
          <strong>Order Confirmation:</strong> After placing an order, you will receive an order confirmation via email.
          This does not signify final acceptance of your order, which occurs once payment is cleared and goods are dispatched.
        </li>

        <li>
          <strong>Fraud Prevention:</strong> We reserve the right to refuse any order suspected of fraudulent activity.
        </li>
      </ul>
    </div>
  );
};

export default PurchasePolicy;
