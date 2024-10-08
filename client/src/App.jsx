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
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile userEmail={userEmail} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/balances/*"
            element={
              isAuthenticated ? (
                <Balances userEmail={userEmail} />
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
  const [userEmail, setUserEmail] = useState(true);

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
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
      />
    </Router>
  );
}

export default App;
