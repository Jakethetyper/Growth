import React, { useEffect, useState } from "react";
import "./Expenses.css";

// Constants for how often options and default categories
const HOW_OFTEN_OPTIONS = [
  { name: "Daily", value: 1 },
  { name: "Weekly", value: 7 },
  { name: "Monthly", value: 30.4 },
  { name: "Yearly", value: 365 },
  { name: "One Time Payment", value: 1 },
];

const DEFAULT_CATEGORIES = [
  "Groceries",
  "Dining Out",
  "Utilities",
  "Entertainment",
  "Transportation",
  "Shopping",
  "Health & Wellness",
  "Bills & Services",
];

// Component
const Expenses = ({ userEmail, userFinancials, setUserFinancials }) => {
  const user = localStorage.getItem("token");

  // States for expenses, categories, and frequency selection
  const [howOften, setHowOften] = useState(365);
  const [expense, setExpense] = useState({ name: "", amount: "" });
  const [expensesList, setExpensesList] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Load data from Local Storage on mount
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expensesList"));
    if (storedExpenses) setExpensesList(storedExpenses);

    const storedCategories = JSON.parse(
      localStorage.getItem("customCategories")
    );
    if (storedCategories) setCustomCategories(storedCategories);
  }, []);

  // Update Local Storage when expenses or categories change
  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  useEffect(() => {
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [customCategories]);

  // Helper functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  // Categorize based on keywords in the name
  const categorizeExpense = (name) => {
    const lowerName = name.toLowerCase();
    const keywordGroups = {
      "Dining Out": [
        "restaurant",
        "dine",
        "food",
        "cafe",
        "coffee",
        "pizza",
        "burger",
        "sushi",
      ],
      Groceries: ["grocery", "supermarket", "walmart", "costco", "market"],
      Utilities: ["utility", "electric", "water", "internet", "phone"],
      Entertainment: ["movie", "concert", "theater", "music", "netflix"],
      Transportation: ["bus", "train", "uber", "lyft", "car", "parking"],
      Shopping: ["clothing", "shoes", "apparel", "amazon", "home goods"],
      "Health & Wellness": ["pharmacy", "doctor", "health", "gym", "fitness"],
      "Bills & Services": ["rent", "mortgage", "insurance", "service"],
    };

    for (const [category, keywords] of Object.entries(keywordGroups)) {
      if (keywords.some((keyword) => lowerName.includes(keyword)))
        return category;
    }

    return "Uncategorized";
  };

  // Event handlers
  const addExpense = async (e) => {
    e.preventDefault();
    const category = categorizeExpense(expense.name);
    const currentDateTime = new Date().toLocaleString();
    const newExpense = { ...expense, category, date: currentDateTime };

    try {
      const res = await fetch("http://localhost:5000/api/addExpense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user,
          name: expense.name,
          cost: expense.amount,
          date: currentDateTime,
          occurence: howOften,
          type: "expense",
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Request failed");
      }

      const newCost = expense.amount / howOften;

      setUserFinancials((prevFinancials) => ({
        ...prevFinancials,
        expenses: [
          ...prevFinancials.expenses,
          {
            name: expense.name,
            amount: newCost,
            date: currentDateTime,
          },
        ],
      }));
    } catch (error) {
      console.log(error);
    }

    setExpensesList([...expensesList, newExpense]);
    setExpense({ name: "", amount: "" });
  };

  const addCustomCategory = (e) => {
    e.preventDefault();
    if (newCategory && !customCategories.includes(newCategory)) {
      setCustomCategories([...customCategories, newCategory]);
      setNewCategory("");
    }
  };

  const handleOftenChange = (event) => {
    setHowOften(event.target.value);
  };

  // Main JSX
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
          <label>Type:</label>
          <select value={howOften} onChange={handleOftenChange}>
            {HOW_OFTEN_OPTIONS.map((option, index) => (
              <option value={option.value} key={index}>
                {option.name}
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
          {userFinancials.expenses.map((expense, index) => (
            <li key={index}>
              <strong>{expense.name}</strong>: ${expense.amount} -{" "}
              <span>{expense.category}</span> - <em>{expense.date}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
