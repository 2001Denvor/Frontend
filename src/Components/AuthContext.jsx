import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ correct named import

const api = "https://localhost:7163/api/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ On app load: decode token and set user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ correct usage
        setUser({
          username: decoded.unique_name,
          role: decoded.role,
        });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (err) {
        console.error("Failed to decode token:", err);
        logout();
      }
    }
  }, []);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${api}/login`, { email, password });
      const { token } = res.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decoded = jwtDecode(token); // ✅ correct usage
      setUser({
        username: decoded.unique_name,
        role: decoded.role,
      });

      return { success: true };
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return {
        error: err.response?.data?.error || "Login failed. Please try again.",
      };
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // ✅ Forgot Password
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

  // ✅ Reset Password
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
