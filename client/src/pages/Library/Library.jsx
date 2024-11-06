// src/pages/Library/Library.jsx

import React from "react";
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
            <a href="/articles/budgeting-basics">
              <FontAwesomeIcon icon={faWallet} /> Budgeting Basics
            </a>
            <p>Learn how to create and stick to a budget effectively.</p>
          </li>
          <li>
            <a href="/articles/investment-strategies">
              <FontAwesomeIcon icon={faChartLine} /> Investment Strategies
            </a>
            <p>Explore strategies to grow your wealth through smart investments.</p>
          </li>
          <li>
            <a href="/articles/savings-goals">
              <FontAwesomeIcon icon={faPiggyBank} /> Savings Goals
            </a>
            <p>Set and achieve your financial goals with practical tips.</p>
          </li>
        </ul>
      </div>

      {/* Interactive Tools Section */}
      <div className="library-tools">
        <h2>Interactive Tools</h2>
        <ul>
          <li>
            <a href="/tools/budget-calculator">Budget Calculator</a>
            <p>Plan your budget and keep track of your spending.</p>
          </li>
          <li>
            <a href="/tools/investment-tracker">Investment Tracker</a>
            <p>Monitor your portfolio's growth and returns.</p>
          </li>
          <li>
            <a href="/tools/loan-calculator">Loan Repayment Calculator</a>
            <p>Calculate monthly repayments for your loans.</p>
          </li>
        </ul>
      </div>

      {/* Featured Articles Section */}
      <div className="featured-articles">
        <h2>Featured Articles</h2>
        <ul>
          <li>
            <a href="/articles/early-retirement">Early Retirement: Is It Possible?</a>
            <p>Discover how you can plan for early retirement effectively.</p>
          </li>
          <li>
            <a href="/articles/building-an-emergency-fund">Building an Emergency Fund</a>
            <p>Secure your finances by preparing for unexpected expenses.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Library;
