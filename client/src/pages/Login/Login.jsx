import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/User/UserContext";

const Login = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signIn, setSignIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signIn) {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Incorrect Login");
        }

        const data = await res.json();

        localStorage.setItem("token", email);

        setIsAuthenticated(true);

        navigate("/");
      } else {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Registration failed");
        }

        localStorage.setItem("token", email);

        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div>
      <h2>{signIn ? "Login" : "Register"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        {signIn ? null : (
          <input
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{signIn ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setSignIn(!signIn)}>
        {signIn
          ? "No account created? Click Here"
          : "Already have an account? Click Here"}
      </button>
      <div>Check LocalStorage, {user ? user : "no user"}</div>
    </div>
  );
};

export default Login;
