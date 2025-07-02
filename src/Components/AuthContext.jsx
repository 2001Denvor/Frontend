import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5238/api/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Check localStorage when app loads
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${api}/login`, {
        email,
        password,
      });

      const { token, user: userInfo } = res.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Set axios header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userInfo);
      return { success: true };
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return {
        error: err.response?.data?.error || "Login failed. Please try again.",
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      await axios.post(`${api}/forgot-password`, { email });
      return { success: true };
    } catch (err) {
      console.error("Forgot Password error:", err.response?.data || err.message);
      return {
        error:
          err.response?.data?.error ||
          "Unable to send reset link. Please try again.",
      };
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword, email) => {
    try {
      await axios.post(`${api}/reset-password`, {
        token,
        newPassword,
        email,
      });
      return { success: true };
    } catch (err) {
      console.error("Reset Password error:", err.response?.data || err.message);
      return {
        error:
          err.response?.data?.error ||
          "Failed to reset password. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
