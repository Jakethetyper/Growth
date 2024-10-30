import React, { useContext, useEffect, useState } from "react";
import "./Expenses.css";

const Expenses = () => {
  const user = localStorage.getItem("token");
  const [howOften, setHowOften] = useState(365);
  // State for a new expense
  const [expense, setExpense] = useState({ name: "", amount: "" });

  // State for the list of expenses
  const [expensesList, setExpensesList] = useState([]);

  // State for custom categories
  const [customCategories, setCustomCategories] = useState([]);

  // State for a new category input
  const [newCategory, setNewCategory] = useState("");

  const howOftenOptions = [
    { name: "Daily", value: 365 },
    { name: "Weekly", value: 52 },
    { name: "Monthly", value: 12 },
    { name: "One Time Payment", value: 1 },
  ];

  // Default categories
  const defaultCategories = [
    "Groceries",
    "Dining Out",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Shopping",
    "Health & Wellness",
    "Bills & Services",
  ];

  // Load expenses and custom categories from Local Storage when the component mounts
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expensesList"));
    if (storedExpenses) {
      setExpensesList(storedExpenses);
    }

    const storedCategories = JSON.parse(
      localStorage.getItem("customCategories")
    );
    if (storedCategories) {
      setCustomCategories(storedCategories);
    }

    getFinancialInfo();
  }, []);

  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  useEffect(() => {
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [customCategories]);

  const getFinancialInfo = async (req, res) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/getFinancialData",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user,
          }),
        }
      );
      console.log(response.data());
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  // Automatically categorize expenses based on keywords in the name
  const categorizeExpense = (name) => {
    const lowerName = name.toLowerCase();

    // Dining Out (including Fast Food chains)
    const diningOutKeywords = [
      "restaurant",
      "dine",
      "food",
      "cafe",
      "coffee",
      "pizza",
      "burger",
      "sushi",
      "deli",
      "takeout",
      "fast food",
      "chinese",
      "italian",
      "mexican",
      "indian",
      "thai",
      "bbq",
      "steakhouse",
      "pub",
      "bakery",
      "mcdonalds",
      "mcdonald's",
      "burger king",
      "wendy's",
      "taco bell",
      "subway",
      "kfc",
      "chick-fil-a",
      "panda express",
      "arby's",
      "dunkin'",
      "starbucks",
      "domino's",
      "pizza hut",
      "popeyes",
      "five guys",
      "chipotle",
    ];
    if (diningOutKeywords.some((keyword) => lowerName.includes(keyword))) {
      return "Dining Out";
    }

    // Groceries
    const groceriesKeywords = [
      "grocery",
      "supermarket",
      "walmart",
      "costco",
      "aldi",
      "trader joe's",
      "whole foods",
      "market",
      "food lion",
      "safeway",
      "kroger",
      "meijer",
    ];
    if (groceriesKeywords.some((keyword) => lowerName.includes(keyword))) {
      return "Groceries";
    }

    // Utilities
    const utilitiesKeywords = [
      "utility",
      "electric",
      "water",
      "gas",
      "internet",
      "phone",
      "cable",
      "power",
      "energy",
      "sewage",
      "garbage",
      "trash",
      "heating",
      "cooling",
    ];
    if (utilitiesKeywords.some((keyword) => lowerName.includes(keyword))) {
      return "Utilities";
    }

    // Entertainment
    const entertainmentKeywords = [
      "movie",
      "cinema",
      "concert",
      "theater",
      "games",
      "music",
      "streaming",
      "netflix",
      "hulu",
      "disney+",
      "prime video",
      "sports",
      "amusement",
      "park",
      "festival",
      "club",
      "show",
      "museum",
      "art",
      "golf",
      "bowling",
    ];
    if (entertainmentKeywords.some((keyword) => lowerName.includes(keyword))) {
      return "Entertainment";
    }

    // Transportation
    const transportationKeywords = [
      "bus",
      "train",
      "uber",
      "lyft",
      "taxi",
      "subway",
      "metro",
      "fuel",
      "gas",
      "car",
      "parking",
      "toll",
      "transit",
      "commute",
      "flight",
      "airline",
      "airfare",
      "ride",
    ];
    if (transportationKeywords.some((keyword) => lowerName.includes(keyword))) {
      return "Transportation";
    }

    // Shopping
    const shoppingKeywords = [
      "clothing",
      "shoes",
      "apparel",
      "retail",
      "fashion",
      "jewelry",
      "mall",
      "shop",
      "store",
      "target",
      "department",
      "electronics",
      "furniture",
      "amazon",
      "ebay",
      "home goods",
      "cosmetics",
      "makeup",
      "skincare",
    ];
    if (shoppingKeywords.some((keyword) => lowerName.includes(keyword))) {
      return "Shopping";
    }

    // Health & Wellness
    const healthKeywords = [
      "pharmacy",
      "doctor",
      "health",
      "hospital",
      "medication",
      "drug",
      "clinic",
      "dentist",
      "vision",
      "optometrist",
      "eye care",
      "gym",
      "fitness",
      "exercise",
      "workout",
      "yoga",
      "wellness",
      "therapy",
    ];
    if (healthKeywords.some((keyword) => lowerName.includes(keyword))) {
      return "Health & Wellness";
    }

    // Bills & Services
    const billsKeywords = [
      "rent",
      "mortgage",
      "loan",
      "insurance",
      "subscription",
      "membership",
      "service",
      "maintenance",
      "repair",
      "cleaning",
      "housekeeping",
      "security",
    ];
    if (billsKeywords.some((keyword) => lowerName.includes(keyword))) {
      return "Bills & Services";
    }

    // Default to Uncategorized
    return "Uncategorized";
  };

  // Add a new expense
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
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Incorrect Login");
      }

      const data = await res.json();
    } catch (error) {
      console.log(error);
    }

    // Update the expenses list state
    setExpensesList([...expensesList, newExpense]);

    // Clear the input fields
    setExpense({ name: "", amount: "" });
  };

  // Add a custom category
  const addCustomCategory = (e) => {
    e.preventDefault();
    if (newCategory && !customCategories.includes(newCategory)) {
      setCustomCategories([...customCategories, newCategory]);
      setNewCategory(""); // Clear the input field
    }
  };

  const handleOftenChange = (event) => {
    setHowOften(event.target.value);
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
          <label>Type:</label>
          <select value={howOften} onChange={handleOftenChange}>
            {howOftenOptions.map((option, index) => (
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
          {expensesList.map((expense, index) => (
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
