import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:5238/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("Login status:", res.status);

    try {
    const data = await res.json();
    console.log("Login response data:", data); // 👈 Add this
    setUser(data);
    return data;
  } catch (err) {
    console.error("Error parsing JSON:", err); // 👈 Will show if 204
    return null;
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
