// Home.jsx
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="parallax">
        <div className="parallax-content">
          <h1>Welcome to Our Website</h1>
          <p>Experience the dynamic feel with parallax scrolling.</p>
        </div>
      </div>
      <div className="container">
        <h2>About Us</h2>
        <p>
          We rock.
        </p>
      </div>
    </div>
  );
};

export default Home;
