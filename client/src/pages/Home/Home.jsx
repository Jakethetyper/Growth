import React from "react";
import "./Home.css";
import growthImage from "./preview.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faChartLine,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="container">
      <div className="side-image left-side"></div>
      <div className="content">
        <div className="description">
          <h1 className="fade-in">Welcome to Our Website</h1>
          <p>
            At Growth, our goal is to get you excited about getting on the path
            to financial freedom!
          </p>
          <img src={growthImage} alt="Growth Chart" className="growth-image" />
        </div>
        <div className="info">
          <h2 className="fade-in">About Us</h2>
          <p>
            <FontAwesomeIcon icon={faChartLine} /> We help you track and manage
            your investments.
          </p>
          <p>
            <FontAwesomeIcon icon={faWallet} /> Learn how to manage your budgets
            efficiently.
          </p>
          <p>
            <FontAwesomeIcon icon={faPiggyBank} /> Keep an eye on all your
            accounts in one place.
          </p>
        </div>
        <div className="todo">
          <h3>To-Do List:</h3>
          <ul>
            <li>Finalize the 'About Us' section.</li>
            <li>Add more details to the 'Welcome' message.</li>
            <li>Design and include a custom image or icon set.</li>
            <li>Revise the layout for better user experience.</li>
            <li>Test and optimize for mobile responsiveness.</li>
          </ul>
        </div>
      </div>
      <div className="side-image right-side"></div>
      <footer className="footer">
        <p>&copy; 2024 Our Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
