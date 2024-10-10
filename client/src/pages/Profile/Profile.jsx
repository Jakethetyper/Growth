import React from "react";
import "./Profile.css";

const Profile = ({ userEmail }) => {
  return (
    <div className="container">
      <h1>{userEmail}'s Page</h1>
    </div>
  );
};

export default Profile;
