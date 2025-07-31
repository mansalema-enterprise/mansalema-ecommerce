import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-bottom">
        <div className="footer-left">
          <h2>Salema</h2>
          <div className="socials">
            <a
              href="https://www.facebook.com/Mansalema"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon" />
            </a>

            <a
              href="https://www.instagram.com/mansalema"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="social-icon" />
            </a>
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

      {/*Copyright Section */}
      <p className="copyright">
        © {new Date().getFullYear()} Salema. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
