
import React, { useState } from "react";
import "./InvestmentTracker.css";

const InvestmentTracker = () => {
  const [investments, setInvestments] = useState([{ name: "", amount: "", returns: "" }]);
  const addInvestmentField = () => setInvestments([...investments, { name: "", amount: "", returns: "" }]);
  const handleInvestmentChange = (index, field, value) => {
    const newInvestments = [...investments];
    newInvestments[index][field] = value;
    setInvestments(newInvestments);
  };

  return (
    <div className="investment-tracker-container">
      <h1>Investment Tracker</h1>
      {investments.map((investment, index) => (
        <div key={index}>
          <input type="text" value={investment.name} onChange={(e) => handleInvestmentChange(index, "name", e.target.value)} placeholder="Investment name" />
          <input type="number" value={investment.amount} onChange={(e) => handleInvestmentChange(index, "amount", e.target.value)} placeholder="Amount invested" />
          <input type="number" value={investment.returns} onChange={(e) => handleInvestmentChange(index, "returns", e.target.value)} placeholder="Returns %" />
        </div>
      ))}
      <button onClick={addInvestmentField}>Add Investment</button>
    </div>
  );
};

export default InvestmentTracker;
