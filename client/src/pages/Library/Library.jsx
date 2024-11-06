// src/pages/Library/Library.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faChartLine,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import "./Library.css";

const Library = () => {
  return (
    <div className="library-container">
      <h1>Library Page</h1>
      
      {/* Informative Resources Section */}
      <div className="library-resources">
        <h2>Financial Resources</h2>
        <ul>
          <li>
            <Link to="/articles/budgeting-basics">
              <FontAwesomeIcon icon={faWallet} /> Budgeting Basics
            </Link>
            <p>Learn how to create and stick to a budget effectively.</p>
          </li>
          <li>
            <Link to="/articles/investment-strategies">
              <FontAwesomeIcon icon={faChartLine} /> Investment Strategies
            </Link>
            <p>Explore strategies to grow your wealth through smart investments.</p>
          </li>
          <li>
            <Link to="/articles/savings-goals">
              <FontAwesomeIcon icon={faPiggyBank} /> Savings Goals
            </Link>
            <p>Set and achieve your financial goals with practical tips.</p>
          </li>
        </ul>
      </div>

      {/* Interactive Tools Section */}
      <div className="library-tools">
        <h2>Interactive Tools</h2>
        <ul>
          <li>
            <Link to="/tools/budget-calculator">Budget Calculator</Link>
            <p>Plan your budget and keep track of your spending.</p>
          </li>
          <li>
            <Link to="/balances/investments">Investment Tracker</Link>
            <p>Monitor your portfolio's growth and returns.</p>
          </li>
          <li>
            <Link to="/tools/loan-repayment-calculator">Loan Repayment Calculator</Link>
            <p>Calculate monthly repayments for your loans.</p>
          </li>
        </ul>
      </div>

      {/* Featured Articles Section */}
      <div className="featured-articles">
        <h2>Featured Articles</h2>
        <ul>
          <li>
            <Link to="/articles/early-retirement">Early Retirement: Is It Possible?</Link>
            <p>Discover how you can plan for early retirement effectively.</p>
          </li>
          <li>
            <Link to="/articles/building-an-emergency-fund">Building an Emergency Fund</Link>
            <p>Secure your finances by preparing for unexpected expenses.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Library;
