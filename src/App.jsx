import React, { useState, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';
import MyProfile from './Components/MyProfile';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import StatCard from './Components/StatCard';
import ChartCard from './Components/ChartCard';
import ProtectedRoute from './Components/ProtectedRoute';
import DashboardRedirect from './Components/DashboardRedirect';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  const location = useLocation();

  // Theme toggle state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Define paths where Topbar should NOT be shown
  const hideTopbarPaths = ['/', '/signup', '/forgot-password', '/reset-password', '/profile'];
  const shouldHideTopbar = hideTopbarPaths.includes(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        {/* Conditionally render Topbar */}
        {!shouldHideTopbar && <Topbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Redirect dashboard based on role */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Admin dashboard route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <Box display="flex">
                  <Sidebar />
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
                    <StatCard />
                    <ChartCard />
                    <UserDashboard />
                  </Box>
                </Box>
              </ProtectedRoute>
            }
          />

          {/* My Profile page */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
