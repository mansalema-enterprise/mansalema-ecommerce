import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-bottom">
        <div className="footer-left">
          <h2>Salema</h2>
          <div className="socials">
            <FaFacebook className="social-icon" />
            <FaInstagram className="social-icon" />
          </div>
        </div>

        <div className="footer-right">
          <ul>
            <li>
              <Link to="/return-policy">Return Policy</Link>
            </li>
            <li>
              <Link to="/delivery-policy">Delivery Policy</Link>
            </li>
            <li>
              <Link to="/purchase-policy">Purchase Policy</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="copyright">Salema. All rights reserved</p>
    </div>
  );
};

export default Footer;
