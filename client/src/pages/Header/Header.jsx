import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/balances">Balances</Link>
      </nav>
    </header>
  );
};

export default Header;
