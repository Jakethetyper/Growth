
import React, { useState } from "react";
import "./BudgetCalculator.css";

const BudgetCalculator = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([{ name: "", amount: "" }]);
  const [summary, setSummary] = useState(null);

  const handleIncomeChange = (e) => setIncome(e.target.value);
  const handleExpenseChange = (index, field, value) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };
  const addExpenseField = () => setExpenses([...expenses, { name: "", amount: "" }]);
  const calculateBudget = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    const balance = parseFloat(income || 0) - totalExpenses;
    setSummary({ totalExpenses, balance });
  };

  return (
    <div className="budget-calculator-container">
      <h1>Budget Calculator</h1>
      <div>
        <label>Income:</label>
        <input type="number" value={income} onChange={handleIncomeChange} placeholder="Enter your income" />
      </div>
      {expenses.map((expense, index) => (
        <div key={index}>
          <input type="text" value={expense.name} onChange={(e) => handleExpenseChange(index, "name", e.target.value)} placeholder="Expense name" />
          <input type="number" value={expense.amount} onChange={(e) => handleExpenseChange(index, "amount", e.target.value)} placeholder="Amount" />
        </div>
      ))}
      <button onClick={addExpenseField}>Add Expense</button>
      <button onClick={calculateBudget}>Calculate</button>
      {summary && (
        <div>
          <p>Total Expenses: ${summary.totalExpenses.toFixed(2)}</p>
          <p>Balance: ${summary.balance.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;
