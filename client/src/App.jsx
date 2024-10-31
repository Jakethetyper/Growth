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

function AppRoutes({
  isAuthenticated,
  setIsAuthenticated,
  userEmail,
  setUserEmail,
  userFinancials,
  setUserFinancials,
}) {
  console.log(userFinancials, userEmail);
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
  const [loading, setLoading] = useState(true);
  const [financialsLoading, setFinancialsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [userFinancials, setUserFinancials] = useState(null);

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

            // Fetch financial data
            const response = await fetch(
              "http://localhost:5000/api/getFinancialData",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: token,
                }),
              }
            );

            if (response.ok) {
              const financialsData = await response.json();
              setUserFinancials(financialsData.financials);
            } else {
              console.error("Failed to fetch financial data");
            }
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
        setLoading(false);
        setFinancialsLoading(false); // Set financials loading to false when done
      }
    };

    checkAuthStatus();
  }, []);

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
