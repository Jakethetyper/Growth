import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useLocation();
  return (
    <header className="header">
      <nav>
        <div onClick={() => navigate("/")}>Home</div>
        <div onClick={() => navigate("/Library")}>Library</div>
        <div onClick={() => navigate("/Profile")}>Profile</div>
      </nav>
    </header>
  );
};

export default Header;
