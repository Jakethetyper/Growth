// src/pages/Balances/Incomes.jsx

import React, { useEffect, useState } from "react";
import "./Incomes.css";

const HOW_OFTEN_OPTIONS = [
  { name: "Daily", value: 365 },
  { name: "Weekly", value: 52 },
  { name: "Monthly", value: 12 },
  { name: "One Time Payment", value: 1 },
];

const Incomes = ({ userEmail, userFinancials, setUserFinancials }) => {
  const [income, setIncome] = useState({ name: "", amount: "" });
  const [incomesList, setIncomesList] = useState([]);
  const [howOften, setHowOften] = useState(365);

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

  const addIncome = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date().toLocaleString();
    setIncome({ name: "", amount: "" });
    try {
      const response = await fetch("http://localhost:5000/api/addExpense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          name: income.name,
          cost: income.amount,
          date: currentDateTime,
          occurence: howOften,
          type: "income",
        }),
      });

      if (!response.ok) {
        // Parse the error response
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
        );
      }

      setUserFinancials((prevFinancials) => ({
        ...prevFinancials,
        incomes: [
          ...prevFinancials.incomes,
          {
            name: income.name,
            amount: income.amount,
            date: currentDateTime,
            occurence: howOften,
          },
        ],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOftenChange = (event) => {
    setHowOften(event.target.value);
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
        <div className="form-group">
          <label>Type:</label>
          <select value={howOften} onChange={handleOftenChange}>
            {HOW_OFTEN_OPTIONS.map((option, index) => (
              <option value={option.value} key={index}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-income-button">
          Add Income
        </button>
      </form>

      <div className="incomes-list">
        <h2>Incomes</h2>
        <ul>
          {userFinancials.incomes.map((income, index) => (
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
