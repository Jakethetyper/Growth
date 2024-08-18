// src/components/Header/Header.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAlignLeft, FaBook, FaHome, FaUser, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [dropdown, setDropDown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleDropdown = () => {
    setDropDown((prevDropdown) => !prevDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className={`nav-container ${dropdown ? "open" : ""}`}>
        <div className="logo">
          <span>My</span>Website
        </div>
        <div className="hamburger-menu" onClick={toggleDropdown}>
          <FaAlignLeft className="icon" />
        </div>
        <div className={`nav-links ${dropdown ? "show" : ""}`}>
          <Link to="/" className="navselect">
            <FaHome className="icon" /> Home
          </Link>
          <Link to="/library" className="navselect">
            <FaBook className="icon" /> Library
          </Link>
          <Link to="/profile" className="navselect">
            <FaUser className="icon" /> Profile
          </Link>
          <Link to="/balances" className="navselect">
            <FaWallet className="icon" /> Balances
          </Link>
          <div className="toggle-container">
            <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
            <label className="toggle">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <span className="slider"></span>
            </label>
          </div>
          <button className="logoutButton" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
