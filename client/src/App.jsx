// App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Balances from "./pages/Balances/Balances";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Library from "./pages/Library/Library";
import Profile from "./pages/Profile/Profile";

function AppRoutes() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/balances" element={<Balances />} />
          <Route path="/account-balances" element={<div>Account Balances</div>} />
          <Route path="/expenses" element={<div>Expenses</div>} />
          <Route path="/incomes" element={<div>Incomes</div>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
