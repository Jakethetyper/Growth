import React, { useState } from "react";
import "./LoanRepaymentCalculator.css";

const LoanRepaymentCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [monthlyRepayment, setMonthlyRepayment] = useState(null);

  const calculateRepayment = () => {
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const repayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    setMonthlyRepayment(repayment);
  };

  return (
    <div className="loan-repayment-calculator-container">
      <h1>Loan Repayment Calculator</h1>
      <div>
        <label>Principal Amount:</label>
        <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="Enter principal" />
      </div>
      <div>
        <label>Annual Interest Rate (%):</label>
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Enter rate" />
      </div>
      <div>
        <label>Loan Term (Years):</label>
        <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Enter term" />
      </div>
      <button onClick={calculateRepayment}>Calculate</button>
      {monthlyRepayment && (
        <div>
          <p>Monthly Repayment: ${monthlyRepayment.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default LoanRepaymentCalculator;
