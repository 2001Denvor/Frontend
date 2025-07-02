import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';

import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';

import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import StatCard from './Components/StatCard';
import ChartCard from './Components/ChartCard';
import ProtectedRoute from './Components/ProtectedRoute';
import DashboardRedirect from './Components/DashboardRedirect';

// ✅ Add these imports
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Redirect /dashboard based on user role */}
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* Admin dashboard route */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <Box display="flex">
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Topbar />
                <StatCard />
                <ChartCard />
                <AdminDashboard />
              </Box>
            </Box>
          </ProtectedRoute>
        }
      />

      {/* User dashboard route */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <Box display="flex">
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Topbar />
                <StatCard />
                <ChartCard />
                <UserDashboard />
              </Box>
            </Box>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
