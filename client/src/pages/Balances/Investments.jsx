import React, { useEffect, useState } from "react";
import "./Investments.css";

const Investments = ({ userEmail, userFinancials, setUserFinancials }) => {
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

  const addInvestment = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date().toLocaleString();

    try {
      const response = await fetch("http://localhost:5000/api/addExpense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          name: investment.name,
          cost: investment.amount,
          date: currentDateTime,
          type: "investment",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
      }

      setUserFinancials((prevFinancials) => ({
        ...prevFinancials,
        investments: [
          ...prevFinancials.investments,
          {
            name: investment.name,
            amount: investment.amount,
            date: currentDateTime,
          },
        ],
      }));
      setInvestmentsList([...investmentsList, { ...investment, date: currentDateTime }]);
      setInvestment({ name: "", amount: "" }); // Reset input fields after adding
    } catch (error) {
      console.error("Failed to add investment:", error);
    }
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
          {userFinancials.investments.map((investment, index) => (
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
