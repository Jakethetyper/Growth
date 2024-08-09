// src/pages/Balances/Balances.jsx

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './Balances.css';
import Expenses from './Expenses';
import Incomes from './Incomes'; // Import the Incomes component
import Investments from './Investments'; // Import the Investments component

const Balances = () => {
  return (
    <div className="balances-container">
      <h1>Balances</h1>
      <div className="balance-links">
        <Link to="expenses" className="balance-link">
          Expenses
        </Link>
        <Link to="incomes" className="balance-link">
          Incomes
        </Link>
        <Link to="investments" className="balance-link">
          Investments
        </Link>
        {/* Add more links as needed */}
      </div>

      <Routes>
        <Route path="expenses" element={<Expenses />} />
        <Route path="incomes" element={<Incomes />} />
        <Route path="investments" element={<Investments />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default Balances;
