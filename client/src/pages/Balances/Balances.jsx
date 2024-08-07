// src/pages/Balances/Balances.jsx

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './Balances.css';
import Expenses from './Expenses';

const Balances = () => {
  return (
    <div className="balances-container">
      <h1>Balances</h1>
      <div className="balance-links">
        <Link to="expenses" className="balance-link">
          Expenses
        </Link>
        {/* Add more links if needed */}
      </div>

      <Routes>
        <Route path="expenses" element={<Expenses />} />
        {/* Add more routes if needed */}
      </Routes>
    </div>
  );
};

export default Balances;
