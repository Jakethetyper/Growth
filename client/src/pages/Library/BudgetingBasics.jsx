// src/pages/Library/BudgetingBasics.jsx

import React, { useState } from "react";
import "./BudgetingBasics.css";

const BudgetingBasics = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([{ name: "", amount: "" }]);
  const [budgetSummary, setBudgetSummary] = useState(null);

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const handleExpenseChange = (index, field, value) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const addExpenseField = () => {
    setExpenses([...expenses, { name: "", amount: "" }]);
  };

  const calculateBudget = () => {
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount || 0),
      0
    );
    const balance = parseFloat(income || 0) - totalExpenses;
    setBudgetSummary({ totalExpenses, balance });
  };

  return (
    <div className="budgeting-basics-container">
      <h1>Budgeting Basics</h1>
      <p>Learn how to create a budget that fits your financial goals.</p>

      <section className="guide-section">
        <h2>Why Budgeting Matters</h2>
        <p>
          Budgeting helps you manage your income, control spending, and plan
          for the future. By creating a budget, you can ensure you're spending
          within your means and saving for long-term goals.
        </p>

        <h2>Popular Budgeting Methods</h2>
        <ul>
          <li>
            <strong>50/30/20 Rule:</strong> Allocate 50% of your income for
            needs, 30% for wants, and 20% for savings or debt repayment.
          </li>
          <li>
            <strong>Zero-Based Budgeting:</strong> Assign every dollar of your
            income a job, ensuring your income minus expenses equals zero.
          </li>
          <li>
            <strong>Envelope System:</strong> Use physical or digital envelopes
            to manage spending by category.
          </li>
        </ul>
      </section>

      <section className="interactive-tool">
        <h2>Interactive Budget Planner</h2>
        <div className="form-group">
          <label>Monthly Income:</label>
          <input
            type="number"
            value={income}
            onChange={handleIncomeChange}
            placeholder="Enter your monthly income"
          />
        </div>

        {expenses.map((expense, index) => (
          <div key={index} className="form-group">
            <label>Expense {index + 1}:</label>
            <input
              type="text"
              value={expense.name}
              onChange={(e) =>
                handleExpenseChange(index, "name", e.target.value)
              }
              placeholder="Expense name"
            />
            <input
              type="number"
              value={expense.amount}
              onChange={(e) =>
                handleExpenseChange(index, "amount", e.target.value)
              }
              placeholder="Amount"
            />
          </div>
        ))}

        <button onClick={addExpenseField} className="add-expense-button">
          Add Expense
        </button>
        <button onClick={calculateBudget} className="calculate-button">
          Calculate Budget
        </button>

        {budgetSummary && (
          <div className="budget-summary">
            <h3>Budget Summary</h3>
            <p>
              <strong>Total Expenses:</strong> $
              {budgetSummary.totalExpenses.toFixed(2)}
            </p>
            <p>
              <strong>Balance:</strong> ${budgetSummary.balance.toFixed(2)}
            </p>
          </div>
        )}
      </section>

      <section className="resources-section">
        <h2>Downloadable Resources</h2>
        <ul>
          <li>
            <a href="/downloads/budget-template.pdf" download>
              Budget Template (PDF)
            </a>
          </li>
          <li>
            <a href="/downloads/budget-template.xlsx" download>
              Budget Template (Excel)
            </a>
          </li>
        </ul>
      </section>

      <section className="related-articles">
        <h2>Related Articles</h2>
        <ul>
          <li>
            <a href="/articles/saving-tips">10 Tips to Boost Your Savings</a>
          </li>
          <li>
            <a href="/articles/debt-reduction">
              Strategies for Reducing Debt
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default BudgetingBasics;
