import React from "react";
import { Link } from "react-router-dom";

const Library = () => {
  return (
    <div>
      <h1>Library Page</h1>
      <ul>
        <li className="card">
          <Link to="/balances">Balance</Link>
        </li>
        {/* Add more options as needed */}
      </ul>
    </div>
  );
};

export default Library;
