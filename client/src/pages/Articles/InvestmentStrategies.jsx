// src/pages/Articles/InvestmentStrategies.jsx

import React from "react";
import "./Article.css";

const InvestmentStrategies = () => {
  return (
    <div className="article-container">
      <h1>Investment Strategies</h1>
      <p>Discover key strategies to grow and manage your investments effectively:</p>

      <section>
        <h2>Diversification</h2>
        <p>Learn how spreading your investments across different asset classes can minimize risk and maximize returns.</p>
      </section>

      <section>
        <h2>Dollar-Cost Averaging</h2>
        <p>Understand the benefits of investing a fixed amount at regular intervals to reduce the impact of market volatility.</p>
      </section>

      <section>
        <h2>Growth Investing vs. Value Investing</h2>
        <p>Explore the differences between these two popular investment strategies and when to use each.</p>
      </section>

      <section>
        <h2>Risk Management</h2>
        <p>Get tips on how to assess your risk tolerance and align your investments accordingly.</p>
      </section>

      <section>
        <h2>Case Studies</h2>
        <p>Read real-life examples of how these strategies have helped investors succeed.</p>
      </section>

      <div className="related-articles">
        <h2>Related Articles</h2>
        <ul>
          <li><a href="/articles/saving-tips">10 Tips to Boost Your Savings</a></li>
          <li><a href="/articles/debt-reduction">Strategies for Reducing Debt</a></li>
        </ul>
      </div>
    </div>
  );
};

export default InvestmentStrategies;
