import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      console.log("hi");
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.message != "Incorrect Login") {
        localStorage.setItem("token", JSON.stringify(email));
        setUser(email);
        if (data === undefined) {
          return false;
        } else {
          return true;
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error submitting login:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
