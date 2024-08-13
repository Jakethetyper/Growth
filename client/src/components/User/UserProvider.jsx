import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    // This ensures that user data is kept in sync with localStorage changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (organization, password) => {
    try {
      console.log("hi");
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organization, password }),
      });

      const data = await response.json();
      if (data.message != "Incorrect Login") {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
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
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
