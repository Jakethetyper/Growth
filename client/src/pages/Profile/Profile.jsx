import React from "react";
import "./Profile.css";

const Profile = ({ userEmail }) => {
  return (
    <div className="profileContainer">
      <h1>{userEmail}'s Page</h1>
      <div className="profileStatsBox">
        <div className="incomeBox">
          <h2>Incomes</h2>
        </div>
        <div className="expensesBox">
          <h2>Expenses</h2>
        </div>
        <div className="investmentsBox">
          <h2>Investments</h2>
        </div>
        <div className="expectedOutlookBox">
          <h2>Growth</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
