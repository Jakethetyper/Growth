import React from "react";
import { Link } from "react-router-dom";

const Balances = () => {
  return (
    <div>
      <h1>Balances</h1>
      <ul>
        <li>
          <Link to="/account-balances">Account Balances</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        <li>
          <Link to="/incomes">Incomes</Link>
        </li>
      </ul>
    </div>
  );
};

export default Balances;
