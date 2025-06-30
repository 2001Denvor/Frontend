import React from 'react';
import { useAuth } from './AuthContext'; // Adjust path as needed
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (requiredRole && user.role !== requiredRole) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'user') {
      return <Navigate to="/user/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Authorized, render children
  return children;
};

export default ProtectedRoute;
