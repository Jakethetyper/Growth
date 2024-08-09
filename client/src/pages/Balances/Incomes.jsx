// src/pages/Balances/Incomes.jsx

import React, { useEffect, useState } from "react";
import "./Incomes.css";

const Incomes = () => {
  const [income, setIncome] = useState({ name: "", amount: "" });
  const [incomesList, setIncomesList] = useState([]);

  useEffect(() => {
    const storedIncomes = JSON.parse(localStorage.getItem("incomesList"));
    if (storedIncomes) {
      setIncomesList(storedIncomes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("incomesList", JSON.stringify(incomesList));
  }, [incomesList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: value });
  };

  const addIncome = (e) => {
    e.preventDefault();
    setIncomesList([...incomesList, income]);
    setIncome({ name: "", amount: "" });
  };

  return (
    <div className="incomes-container">
      <h1>Incomes</h1>

      <form onSubmit={addIncome} className="income-form">
        <div className="form-group">
          <label>Income Source:</label>
          <input
            type="text"
            name="name"
            value={income.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={income.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="add-income-button">
          Add Income
        </button>
      </form>

      <div className="incomes-list">
        <h2>Incomes</h2>
        <ul>
          {incomesList.map((income, index) => (
            <li key={index}>
              <strong>{income.name}</strong>: ${income.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Incomes;
