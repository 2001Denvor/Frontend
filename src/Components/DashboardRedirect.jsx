// DashboardRedirect.jsx
import React from 'react';
import { useAuth } from './AuthContext'; // Adjust the path as needed
import { Navigate } from 'react-router-dom';

const DashboardRedirect = () => {
  const { user } = useAuth();

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Redirect based on user role
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === 'user') {
    return <Navigate to="/user/dashboard" replace />;
  }

  // Fallback to login if role is unknown or missing
  return <Navigate to="/" replace />;
};

export default DashboardRedirect;
