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
          <label>Period:</label>
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
          {userFinancials.incomes.length > 0 ? (
            <>
              <div className="financialHeader">
                <div>
                  <strong>Income Source:</strong>
                </div>
                <div>Amount</div>
              </div>
              <ul className="financialsBlock">
                {userFinancials.incomes.map((income, index) => (
                  <li key={index} className="financialBlock">
                    <div>{income.name}</div>
                    <div>${income.amount}</div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>No Investments Recorded</div>
          )}
        </div>
        <div className="Box">
          <h2>Expenses</h2>
          {userFinancials.expenses.length > 0 ? (
            <>
              <div className="financialHeader">
                <div>
                  <strong>Expense:</strong>
                </div>
                <div>Amount</div>
              </div>
              <ul>
                {userFinancials.expenses.map((expense, index) => (
                  <li key={index} className="financialBlock">
                    <div>{expense.name}</div>
                    <div>${expense.amount}</div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>No Investments Recorded</div>
          )}
        </div>
        <div className="Box">
          <h2>Investments</h2>
          {userFinancials.investments.length > 0 ? (
            <>
              <div className="financialHeader">
                <div>
                  <strong>Investment:</strong>
                </div>
                <div>Amount</div>
              </div>
              <ul>
                {userFinancials.investments.map((investment, index) => (
                  <li key={index} className="financialBlock">
                    <div>{investment.name}</div>
                    <div>${investment.amount}</div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>No Investments Recorded</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
