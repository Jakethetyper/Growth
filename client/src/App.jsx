import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Balances from "./pages/Balances/Balances";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Library from "./pages/Library/Library";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import BudgetingBasics from "./pages/Library/BudgetingBasics";
import SavingTips from "./pages/Articles/SavingTips"; // Import article pages
import DebtReduction from "./pages/Articles/DebtReduction"; // Import article pages

function AppRoutes({
  isAuthenticated,
  setIsAuthenticated,
  userEmail,
  setUserEmail,
  userFinancials,
  setUserFinancials,
}) {
  return (
    <div>
      {isAuthenticated && (
        <Header
          setIsAuthenticated={setIsAuthenticated}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      )}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home userEmail={userEmail} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/library"
            element={
              isAuthenticated ? (
                <Library userEmail={userEmail} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/articles/budgeting-basics"
            element={
              isAuthenticated ? (
                <BudgetingBasics />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/articles/saving-tips"
            element={
              isAuthenticated ? (
                <SavingTips />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/articles/debt-reduction"
            element={
              isAuthenticated ? (
                <DebtReduction />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile
                  userEmail={userEmail}
                  userFinancials={userFinancials}
                  setUserFinancials={setUserFinancials}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/balances/*"
            element={
              isAuthenticated ? (
                <Balances
                  userEmail={userEmail}
                  userFinancials={userFinancials}
                  setUserFinancials={setUserFinancials}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Register setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for auth check
  const [financialsLoading, setFinancialsLoading] = useState(true); // Loading state for financial data
  const [userEmail, setUserEmail] = useState(null);
  const [userFinancials, setUserFinancials] = useState();

  // Check authentication and fetch financial data
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const res = await axios.get("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            setIsAuthenticated(true);
            setUserEmail(token);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Stop loading when auth check is complete
      }
    };

    const fetchFinancialData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/getFinancialData",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const financialsData = await response.json();
        console.log(financialsData);
        if (financialsData.financials === null) {
          setUserFinancials({
            email: `${userEmail}`,
            expenses: [],
            investments: [],
            incomes: [],
          });
        } else {
          setUserFinancials(financialsData.financials);
        }
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setFinancialsLoading(false); // Stop loading after fetching financial data
      }
    };

    // First check auth status, then fetch financial data if authenticated
    checkAuthStatus().then(() => {
      if (userEmail) {
        fetchFinancialData();
      } else {
        setFinancialsLoading(false); // Skip fetching if not authenticated
      }
    });
  }, [userEmail]);

  // Render loading indicator until both auth and financial data are loaded
  if (loading || financialsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userFinancials={userFinancials}
        setUserFinancials={setUserFinancials}
      />
    </Router>
  );
}

export default App;
