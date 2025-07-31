import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser, BiCart, BiSearch } from "react-icons/bi";
import { FaCentos } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import "./Navbar.css";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { updateSearchTerm, getCartCount, token, setToken } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem(token);
    setToken("");
  };

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    navigate(path);
  };

  const handleSearch = () => {
    updateSearchTerm(searchInput);
    setShowMobileSearch(false); // hide after search on mobile
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

      {/* Top Navbar */}
      <nav className="navbar">
        <div className="nav-top">
          {/* Logo */}
          <Link to="/" onClick={() => { updateSearchTerm(""); setSearchInput(""); }}>
            <h2>Salema</h2>
          </Link>

          {/* Desktop Search Bar */}
          <div className="search-bar desktop-search">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
              placeholder="Search for a product"
            />
            <BiSearch
              className="search-icon"
              onClick={handleSearch}
              title="Search"
            />
          </div>

          {/* Icons */}
          <div className="icons">
            {/* Mobile Search Icon */}
            <BiSearch
              className="mobile-search-icon"
              onClick={() => setShowMobileSearch(true)}
              title="Search"
            />

            <div className="profile-group">
              <BiUser className="icon" onClick={() => setShowDropdown(!showDropdown)} />
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/login"><p className="dropdown-item">Login/Sign Up</p></Link>
                  <Link to="/orders"><p className="dropdown-item">Orders</p></Link>
                  <p onClick={logout} className="dropdown-item">Logout</p>
                </div>
              )}
            </div>

            <div className="customer-service-icon" onClick={() => handleNavigation("/CustomerService")} title="Customer Service">
              <MdSupportAgent />
            </div>

            <div className="cart-icon" onClick={() => handleNavigation("/cart")}>
              <BiCart className="icon" />
              <span className="cart-count">{getCartCount()}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Nav Links */}
      <div className="nav-bottom">
        <div className="nav-container">
          <div onClick={() => handleNavigation("/category/Salema")} className="navbar-link">Salema</div>
          <div onClick={() => handleNavigation("/category/Self-Defence")} className="navbar-link">Self-Defence</div>
          <div onClick={() => handleNavigation("/category/Security")} className="navbar-link">Security</div>
        </div>
      </div>

      {/* Mobile Fullscreen Search */}
      {showMobileSearch && (
        <div className="mobile-search-overlay">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            autoFocus
          />
          <button onClick={handleSearch}>Search</button>
          <span className="close-search" onClick={() => setShowMobileSearch(false)}>✖</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
