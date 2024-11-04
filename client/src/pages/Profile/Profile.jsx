import React from "react";
import "./Profile.css";

const Profile = ({ userEmail, userFinancials, setUserFinancials }) => {
  const outlookOptions = [
    { name: "6 Months", value: "6" },
    { name: "1 Year", value: "12" },
    { name: "2 Years", value: "24" },
    { name: "5 Years", value: "60" },
    { name: "10 Years", value: "120" },
    { name: "20 Years", value: "240" },
  ];
  return (
    <div className="profileContainer">
      <h1>{userEmail}'s Page</h1>
      <div className="financialChoiceBlock">
        <div>
          <label>Outlook:</label>
          <select>
            {outlookOptions.map((option, index) => (
              <option value={option.value} key={index}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Outlook:</label>
          <select>
            {outlookOptions.map((option, index) => (
              <option value={option.value} key={index}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="profileStatsBox">
        <div className="Box">
          <h2>Growth</h2>
        </div>
        <div className="Box">
          <h2>Incomes</h2>
          <ul>
            <li className="financialHeader">
              <div>
                <strong>Income Source:</strong>
              </div>
              <div>Amount</div>
            </li>
            {userFinancials.incomes.map((income, index) => (
              <li key={index} className="financialBlock">
                <div>{income.name}</div>
                <div>${income.amount}</div>
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
      </div>
    </div>
  );
};

export default Profile;
