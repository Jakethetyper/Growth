// src/pages/Balances/Expenses.jsx

import React, { useEffect, useState } from "react";
import "./Expenses.css";

const Expenses = () => {
  // State for a new expense
  const [expense, setExpense] = useState({ name: "", amount: "", category: "" });

  // State for the list of expenses
  const [expensesList, setExpensesList] = useState([]);

  // State for custom categories
  const [customCategories, setCustomCategories] = useState([]);

  // State for a new category input
  const [newCategory, setNewCategory] = useState("");

  // Default categories
  const defaultCategories = [
    "Groceries",
    "Dining Out",
    "Utilities",
    "Entertainment",
    "Transportation",
  ];

  // Load expenses and custom categories from Local Storage when the component mounts
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expensesList"));
    if (storedExpenses) {
      setExpensesList(storedExpenses);
    }

    const storedCategories = JSON.parse(localStorage.getItem("customCategories"));
    if (storedCategories) {
      setCustomCategories(storedCategories);
    }
  }, []);

  // Save expenses to Local Storage whenever the expensesList changes
  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  // Save custom categories to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [customCategories]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  // Add a new expense
  const addExpense = (e) => {
    e.preventDefault();
    const category = expense.category || categorizeExpense(expense.name);
    const newExpense = { ...expense, category };

    // Update the expenses list state
    setExpensesList([...expensesList, newExpense]);

    // Clear the input fields
    setExpense({ name: "", amount: "", category: "" });
  };

  // Automatically categorize expenses based on keywords in the name
  const categorizeExpense = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("grocery") || lowerName.includes("supermarket")) {
      return "Groceries";
    }
    if (lowerName.includes("restaurant") || lowerName.includes("dine")) {
      return "Dining Out";
    }
    if (lowerName.includes("utility") || lowerName.includes("electric")) {
      return "Utilities";
    }
    if (lowerName.includes("movie") || lowerName.includes("concert")) {
      return "Entertainment";
    }
    if (lowerName.includes("bus") || lowerName.includes("train")) {
      return "Transportation";
    }
    return "Uncategorized";
  };

  // Add a custom category
  const addCustomCategory = (e) => {
    e.preventDefault();
    if (newCategory && !customCategories.includes(newCategory)) {
      setCustomCategories([...customCategories, newCategory]);
      setNewCategory(""); // Clear the input field
    }
  };

  return (
    <div className="expenses-container">
      <h1>Expense Categorization</h1>

      <form onSubmit={addExpense} className="expense-form">
        <div className="form-group">
          <label>Expense Name:</label>
          <input
            type="text"
            name="name"
            value={expense.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={expense.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {defaultCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            {customCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-expense-button">
          Add Expense
        </button>
      </form>

      <div className="custom-category">
        <h2>Add Custom Category</h2>
        <form onSubmit={addCustomCategory}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
          />
          <button type="submit" className="add-category-button">
            Add Category
          </button>
        </form>
      </div>

      <div className="expenses-list">
        <h2>Expenses</h2>
        <ul>
          {expensesList.map((expense, index) => (
            <li key={index}>
              <strong>{expense.name}</strong>: ${expense.amount} -{" "}
              <span>{expense.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
