// src/pages/Balances/Investments.jsx

import React, { useEffect, useState } from "react";
import "./Investments.css";

const Investments = () => {
  const [investment, setInvestment] = useState({ name: "", amount: "" });
  const [investmentsList, setInvestmentsList] = useState([]);

  useEffect(() => {
    const storedInvestments = JSON.parse(localStorage.getItem("investmentsList"));
    if (storedInvestments) {
      setInvestmentsList(storedInvestments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("investmentsList", JSON.stringify(investmentsList));
  }, [investmentsList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvestment({ ...investment, [name]: value });
  };

  const addInvestment = (e) => {
    e.preventDefault();
    setInvestmentsList([...investmentsList, investment]);
    setInvestment({ name: "", amount: "" });
  };

  return (
    <div className="investments-container">
      <h1>Investments</h1>

      <form onSubmit={addInvestment} className="investment-form">
        <div className="form-group">
          <label>Investment Name:</label>
          <input
            type="text"
            name="name"
            value={investment.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={investment.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="add-investment-button">
          Add Investment
        </button>
      </form>

      <div className="investments-list">
        <h2>Investments</h2>
        <ul>
          {investmentsList.map((investment, index) => (
            <li key={index}>
              <strong>{investment.name}</strong>: ${investment.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Investments;
