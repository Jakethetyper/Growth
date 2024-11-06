import React, { useState, useEffect } from "react";
import "./Profile.css";

const outlookOptions = [
  { name: "6 Months", value: "6" },
  { name: "1 Year", value: "12" },
  { name: "2 Years", value: "24" },
  { name: "5 Years", value: "60" },
  { name: "10 Years", value: "120" },
  { name: "20 Years", value: "240" },
];

const PAY_PERIOD = [
  { name: "Daily", value: 1 },
  { name: "Weekly", value: 7 },
  { name: "Biweekly", value: 14 },
  { name: "Monthly", value: 30.4 },
  { name: "Yearly", value: 365 },
];

const Profile = ({ userEmail, userFinancials, setUserFinancials }) => {
  const [payPeriod, setPayPeriod] = useState(1);
  const [totals, setTotals] = useState({
    incomesTotal: 0,
    expensesTotal: 0,
    investmentsTotal: 0,
  });
  const [net, setNet] = useState(0);

  const handlePayChange = (event) => {
    setPayPeriod(event.target.value);
  };

  useEffect(() => {
    const expenseTotal = userFinancials.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const incomeTotal = userFinancials.incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    const investmentTotal = userFinancials.investments.reduce(
      (sum, investment) => sum + investment.amount,
      0
    );

    const netTotal = incomeTotal + investmentTotal - expenseTotal;
    setNet(netTotal);

    setTotals({
      incomesTotal: incomeTotal,
      expensesTotal: expenseTotal,
      investmentsTotal: investmentTotal,
    });
  }, [userFinancials]);

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
          <label>Pay Period:</label>
          <select onChange={handlePayChange}>
            {PAY_PERIOD.map((option, index) => (
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
          <div className="growthBlockContainer">
            <div className="growthBlock">
              <div>Net Profit:</div>
              <div>${(net * payPeriod).toFixed(2)}</div>
            </div>
          </div>
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
              <ul className="financialsBlockContainer">
                {userFinancials.incomes.map((income, index) => (
                  <li key={index} className="financialBlock">
                    <div>{income.name}</div>
                    <div>${(income.amount * payPeriod).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
              <div className="financialTotal">
                <div>
                  <strong>Total:</strong>
                </div>
                <div>${(totals.incomesTotal * payPeriod).toFixed(2)}</div>
              </div>
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
              <ul className="financialsBlockContainer">
                {userFinancials.expenses.map((expense, index) => (
                  <li key={index} className="financialBlock">
                    <div>{expense.name}</div>
                    <div>-${(expense.amount * payPeriod).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
              <div className="financialTotal">
                <div>
                  <strong>Total:</strong>
                </div>
                <div>-${(totals.expensesTotal * payPeriod).toFixed(2)}</div>
              </div>
            </>
          ) : (
            <div>No Expenses Recorded</div>
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
              <ul className="financialsBlockContainer">
                {userFinancials.investments.map((investment, index) => (
                  <li key={index} className="financialBlock">
                    <div>{investment.name}</div>
                    <div>${investment.amount}</div>
                  </li>
                ))}
              </ul>
              <div className="financialTotal">
                <div>
                  <strong>Total:</strong>
                </div>
                <div>${(totals.investmentsTotal * payPeriod).toFixed(2)}</div>
              </div>
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
