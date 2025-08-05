import React, { useState } from "react";
import { FaCentos } from "react-icons/fa";
import { IoIosLogOut, IoMdAddCircleOutline } from "react-icons/io";
import { MdFormatListBulleted, MdAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="hamburger-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Dark overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar-container ${isOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h2>Salema</h2>
        </div>

        <div className="sidebar-links">
          <NavLink className="sidebar-link" to="/add" onClick={closeSidebar}>
            <IoMdAddCircleOutline className="sidebar-icon" />
            <p className="sidebar-text">Add Product</p>
          </NavLink>
          <NavLink className="sidebar-link" to="/list" onClick={closeSidebar}>
            <MdFormatListBulleted className="sidebar-icon" />
            <p className="sidebar-text">List Products</p>
          </NavLink>
          <NavLink className="sidebar-link" to="/orders" onClick={closeSidebar}>
            <MdAddShoppingCart className="sidebar-icon" />
            <p className="sidebar-text">Orders</p>
          </NavLink>
          <button
            onClick={() => {
              setToken("");
              closeSidebar();
            }}
            className="sidebar-link"
          >
            <IoIosLogOut className="sidebar-icon" />
            <p className="sidebar-text">Logout</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
