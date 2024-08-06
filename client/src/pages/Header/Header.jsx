import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaBook, FaHome, FaUser, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [dropdown, setDropDown] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="header">
      {dropdown ? (
        <nav>
          <FaAlignLeft
            onClick={() => setDropDown(!dropdown)}
            className="navselect"
          />
          <Link to="/">
            <FaHome className="icon" /> Home
          </Link>
          <Link to="/library">
            <FaBook className="icon" /> Library
          </Link>
          <Link to="/profile">
            <FaUser className="icon" /> Profile
          </Link>
          <Link to="/balances">
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
        </nav>
      ) : (
        <FaAlignLeft onClick={() => setDropDown(!dropdown)} className="icon" />
      )}
    </header>
  );
};

export default Header;
