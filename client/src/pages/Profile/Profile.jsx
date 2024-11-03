import React from "react";
import "./Profile.css";

const Profile = ({ userEmail, userFinancials, setUserFinancials }) => {
  return (
    <div className="profileContainer">
      <h1>{userEmail}'s Page</h1>
      <div className="profileStatsBox">
        <div className="Box">
          <h2>Incomes</h2>
          <ul>
            {userFinancials.incomes.map((income, index) => (
              <li key={index}>
                <div>{income.name}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="Box">
          <h2>Expenses</h2>
        </div>
        <div className="Box">
          <h2>Investments</h2>
        </div>
        <div className="Box">
          <h2>Growth</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
