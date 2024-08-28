import React from "react";
import "./Home.css";
import growthImage from "./growth_home_backgroundimage01.jpg.jpg"; // Import the image

const Home = () => {
  return (
    <div className="container">
      <div className="side-image left-side"></div>
      <div className="content">
        <div className="description">
          <h1 className="fade-in">Welcome to Our Website</h1>
          <p>Jake, we need to finish this page. See if you can convince Joe to design a picture... otherwise, we could probably just
            use AI to create one. I can fill out the description later.</p>
          <img src={growthImage} alt="Growth Chart" className="growth-image" />
        </div>
        <div className="info">
          <h2 className="fade-in">About Us</h2>
          <p>We rock.</p>
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
