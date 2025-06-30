import React, { createContext, useContext, useState } from "react";

const api = "http://localhost:5238/api/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${api}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("JSON parse error:", jsonErr);
        return { error: "Invalid response from server" };
      }

      if (!res.ok) {
        return { error: data.error || "Login failed" };
      }

      setUser(data); // Save user data globally
      return data;
    } catch (err) {
      console.error("Login error:", err);
      return { error: "Network or server error" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
