// ./Components/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext();
const api = "https://localhost:7163/api/Auth"; // ✅ Adjust if different

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const {
    isAuthenticated,
    user: auth0User,
    getIdTokenClaims,
    isLoading,
    logout: auth0Logout,
  } = useAuth0();

  // Decode JWT and set user
  const decodeAndSetUser = (token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      const userObj = {
        fullname: decoded.fullname || decoded.name || decoded.unique_name || "",
        role: decoded.role || "user",
        email: decoded.email || "",
      };
      setUser(userObj);
      return userObj;
    } catch (err) {
      console.error("Failed to decode token:", err);
      logout();
      return null;
    }
  };

  // ✅ Traditional email/password login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${api}/login`, { email, password });
      const { token } = res.data;

      if (!token) throw new Error("No token returned");

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decodedUser = decodeAndSetUser(token);
      return { success: true, user: decodedUser };
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data?.error || "Login failed. Please try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    if (isAuthenticated) {
      auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post(`${api}/forgot-password`, { email });
      return { success: true };
    } catch (err) {
      return {
        error: err.response?.data?.error || "Failed to send reset link.",
      };
    }
  };

  const resetPassword = async (token, newPassword, email) => {
    try {
      await axios.post(`${api}/reset-password`, { token, newPassword, email });
      return { success: true };
    } catch (err) {
      return {
        error: err.response?.data?.error || "Failed to reset password.",
      };
    }
  };

  // ✅ On load, try JWT token or Auth0 social login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      decodeAndSetUser(token);
    } else if (isAuthenticated && auth0User) {
      (async () => {
        try {
          const idToken = await getIdTokenClaims();
          const rawToken = idToken?.__raw;

          if (!rawToken) return;

          localStorage.setItem("token", rawToken);
          axios.defaults.headers.common["Authorization"] = `Bearer ${rawToken}`;

          const res = await axios.post(`${api}/social-login`, { token: rawToken });

          if (res.data?.token) {
            localStorage.setItem("token", res.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
            decodeAndSetUser(res.data.token);
          } else {
            decodeAndSetUser(rawToken);
          }
        } catch (err) {
          console.error("Auth0 social login failed:", err);
        }
      })();
    }
  }, [isAuthenticated, auth0User]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, forgotPassword, resetPassword }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
