import React from "react";
import { FaBalanceScale, FaMoneyBillWave, FaWallet } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Balances = () => {
  return (
    <div className="container">
      <h1>Balances</h1>
      <ul>
        <li className="card">
          <FaBalanceScale className="icon" />
          <Link to="/account-balances">Account Balances</Link>
        </li>
        <li className="card">
          <FaMoneyBillWave className="icon" />
          <Link to="/expenses">Expenses</Link>
        </li>
        <li className="card">
          <FaWallet className="icon" />
          <Link to="/incomes">Incomes</Link>
        </li>
      </ul>
    </div>
  );
};

export default Balances;
