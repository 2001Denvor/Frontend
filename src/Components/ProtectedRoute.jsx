import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If a specific role is required, check it
  if (requiredRole && user.role !== requiredRole) {
    // Redirect based on their actual role
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "user":
        return <Navigate to="/user/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Authorized, render children
  return children;
};

export default ProtectedRoute;
