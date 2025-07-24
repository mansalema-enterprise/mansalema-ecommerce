import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser, BiCart } from "react-icons/bi";
import { FaCentos } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import "./Navbar.css";
import CustomerService from "../CustomerService/CustomerService";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { updateSearchTerm, getCartCount, token, setToken } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    localStorage.removeItem(token);
    setToken("");
  };

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    navigate(path);
  };

  const handleSearch = () => {
    updateSearchTerm(searchInput);
  };

  return (
    <div>
      {loading && (
        <div className="loader-container">
          <div className="loader">
            <FaCentos className="loader-icon" />
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="nav-top">
          <Link
            to="/"
            onClick={() => {
              updateSearchTerm("");
              setSearchInput("");
            }}
          >
            <h2>Salema</h2>
          </Link>
          <div className="search-bar">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
              placeholder="Search for a product"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
  
          <div className="icons">
            <div className="profile-group">
              <BiUser className="icon" />
              <div className="dropdown-menu">
                <Link to="/login">
                  <p className="dropdown-item">Login/Sign Up</p>
                </Link>
                <Link to="/orders">
                  <p className="dropdown-item">Orders</p>
                </Link>
                <p onClick={logout} className="dropdown-item">
                  Logout
                </p>
              </div>
            </div>

            <div
              className="customer-service-icon"
              onClick={() => handleNavigation("/CustomerService")}
              title="Customer Service"
            >
              <MdSupportAgent />
            </div>

            <div
              className="cart-icon"
              onClick={() => handleNavigation("/cart")}
            >
              <BiCart className="icon" />
              <span className="cart-count">{getCartCount()}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="nav-bottom">
        <div className="nav-container">
          <div
            onClick={() => handleNavigation("/category/Salema")}
            className="navbar-link"
          >
            Salema
          </div>
          <div
            onClick={() => handleNavigation("/category/Self-Defence")}
            className="navbar-link"
          >
            Self-Defence
          </div>
          <div
            onClick={() => handleNavigation("/category/Security")}
            className="navbar-link"
          >
            Security
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
