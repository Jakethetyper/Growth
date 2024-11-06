// src/pages/Articles/SavingsGoals.jsx

import React from "react";
import "./Article.css";

const SavingsGoals = () => {
  return (
    <div className="article-container">
      <h1>Savings Goals</h1>
      <p>Setting and achieving your savings goals can help you build financial security and reach important milestones in life.</p>

      <section>
        <h2>Why Savings Goals Are Important</h2>
        <p>Having well-defined savings goals provides motivation, direction, and a clear plan to achieve financial milestones.</p>
      </section>

      <section>
        <h2>Types of Savings Goals</h2>
        <h3>Emergency Fund</h3>
        <p>Set aside money for unexpected expenses like medical bills or car repairs.</p>

        <h3>Short-Term Goals</h3>
        <p>Examples include saving for a vacation or a new gadget. These are typically achievable within a year.</p>

        <h3>Medium-Term Goals</h3>
        <p>Goals like buying a car or making home improvements usually require a few years of saving.</p>

        <h3>Long-Term Goals</h3>
        <p>These include big milestones like saving for retirement or your child’s education.</p>
      </section>

      <section>
        <h2>Steps to Set Your Savings Goals</h2>
        <ol>
          <li><strong>Identify Your Goals:</strong> Decide what you are saving for and prioritize.</li>
          <li><strong>Set Realistic Timeframes:</strong> Choose a timeframe that is achievable.</li>
          <li><strong>Calculate How Much You Need:</strong> Break down your total savings target into monthly contributions.</li>
          <li><strong>Track Your Progress:</strong> Use tools to monitor how close you are to your goal.</li>
        </ol>
      </section>

      <section>
        <h2>Tips for Staying on Track</h2>
        <ul>
          <li>Automate your savings so you don’t have to think about it.</li>
          <li>Revisit your goals periodically and adjust as needed.</li>
          <li>Celebrate small milestones to stay motivated.</li>
        </ul>
      </section>

      <div className="related-articles">
        <h2>Related Articles</h2>
        <ul>
          <li><a href="/articles/investment-strategies">Investment Strategies</a></li>
          <li><a href="/articles/budgeting-basics">Budgeting Basics</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SavingsGoals;
