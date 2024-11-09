import React, { useState, useEffect } from "react";
import "./Profile.css";

const outlookOptions = [
  { name: "6 Months", value: "182" },
  { name: "1 Year", value: "365" },
  { name: "2 Years", value: "730" },
  { name: "5 Years", value: "1825" },
  { name: "10 Years", value: "3650" },
  { name: "20 Years", value: "7300" },
];

const PAY_PERIOD = [
  { name: "Daily", value: 1 },
  { name: "Weekly", value: 7 },
  { name: "Biweekly", value: 14 },
  { name: "Monthly", value: 30.4 },
  { name: "Yearly", value: 365 },
];

const PeriodsPerYear = [
  { name: "Daily", value: 365 },
  { name: "Weekly", value: 52 },
  { name: "Biweekly", value: 26 },
  { name: "Monthly", value: 12 },
  { name: "Yearly", value: 1 },
];

const Profile = ({ userEmail, userFinancials, setUserFinancials }) => {
  const [payPeriod, setPayPeriod] = useState(1);
  const [outlook, setOutlook] = useState(182);
  const [totals, setTotals] = useState({
    incomesTotal: 0,
    expensesTotal: 0,
    investmentsTotal: 0,
  });
  const [net, setNet] = useState(0);
  const [theoreticals, setTheoreticals] = useState({
    interest: 0,
    investmentAmount: 0,
    investmentPeriod: 365,
    outlookDividend: 1,
  });
  const [theoreticalGains, setTheoreticalGains] = useState(0);

  const handlePayChange = (event) => {
    setPayPeriod(Number(event.target.value));
  };

  useEffect(() => {
    calculateOutlook();
  }, [theoreticals, payPeriod, outlook]);

  useEffect(() => {
    if (!userFinancials) return; // Exit if userFinancials is not loaded

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

    setTheoreticals((prevState) => ({
      ...prevState,
      investmentPeriod: netTotal,
    }));

    setTotals({
      incomesTotal: incomeTotal,
      expensesTotal: expenseTotal,
      investmentsTotal: investmentTotal,
    });
  }, [userFinancials]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTheoreticals({ ...theoreticals, [name]: value });
  };

  const handleOutlookChange = (event) => {
    console.log(event.target.value);
    const selectedOption = outlookOptions.find(
      (option) => option.value === event.target.value
    );
    setOutlook(event.target.value);
  };

  const handleInvestmentPeriodChange = (e) => {
    const value = Number(e.target.value); // Convert to number
    let test = 0;

    if (value === 365) {
      test = 1;
    } else if (value === 52) {
      test = 7;
    } else if (value === 26) {
      test = 14;
    } else if (value === 12) {
      test = 30;
    } else {
      test = 365;
    }

    setTheoreticals((prevState) => ({
      ...prevState,
      investmentPeriod: value, // Set as number
      outlookDividend: test,
    }));
  };

  const calculateOutlook = () => {
    // Ensure theoreticals.interest is in decimal form
    const annualInterestRate = Number(theoreticals.interest) / 100;

    // Periodic rate based on the number of investment periods
    const rate =
      Math.pow(1 + annualInterestRate, 1 / theoreticals.investmentPeriod) - 1;

    // Number of periods within the specified outlook
    const investmentsPerPeriod = Math.floor(
      outlook / theoreticals.outlookDividend
    );
    const amount = Number(theoreticals.investmentAmount);

    let futureValue = 0;

    // Calculate compounded future value over investment periods
    for (let t = 0; t < investmentsPerPeriod; t++) {
      futureValue += amount * Math.pow(1 + rate, investmentsPerPeriod - t - 1);
    }

    setTheoreticalGains(futureValue);
  };

  return (
    <div className="profileContainer">
      <h1>{userEmail}'s Page</h1>
      <div className="financialChoiceBlock">
        <div>
          <label>Outlook:</label>
          <select onChange={handleOutlookChange}>
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
      {userFinancials ? (
        <div className="profileStatsBox">
          <div className="Box">
            <h2 className="headerTwoProfile">Growth</h2>
            <div className="growthBlockContainer">
              <div className="growthBlock">
                <div>
                  <strong>Net Profit:</strong>
                </div>
                <div>${(net * payPeriod).toFixed(2)}</div>
              </div>
            </div>
            <h2 className="headerTwoProfile">Theoretical Gains</h2>
            <div className="growthBlockContainer">
              <div className="growthBlock">
                <div>
                  <strong>Investment Period:</strong>
                </div>
                <div>
                  <select
                    className="selectInvest"
                    onChange={handleInvestmentPeriodChange}
                  >
                    {PeriodsPerYear.map((option, index) => (
                      <option
                        value={option.value}
                        key={index}
                        name={option.name}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="growthBlock">
                <div>
                  <strong>Investment Amount:</strong>
                </div>
                <div className="interestContainer">
                  $
                  <input
                    className="interestBlock"
                    type="number"
                    min={0}
                    max={net * theoreticals.investmentPeriod}
                    name="investmentAmount" // Add name attribute
                    value={theoreticals.investmentAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="growthBlock">
                <div>
                  <strong>Expected Yearly Interest:</strong>
                </div>
                <div className="interestContainer">
                  <input
                    className="interestBlock"
                    type="number"
                    name="interest" // Add name attribute
                    value={theoreticals.interest}
                    onChange={handleInputChange}
                  />
                  %
                </div>
              </div>
              <div>{theoreticalGains}</div>
            </div>
          </div>
          <div className="Box">
            <h2 className="headerTwoProfile">Incomes</h2>
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
            <h2 className="headerTwoProfile">Expenses</h2>
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
            <h2 className="headerTwoProfile">Investments</h2>
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
      ) : null}
    </div>
  );
};

export default Profile;
