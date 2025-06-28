// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import AdminDashboard from './Pages/AdminDashboard';


// Component imports
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import UserDashboard from './Pages/UserDashboard';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import StatCard from './Components/StatCard';
import ChartCard from './Components/ChartCard';
import  ProtectedRoute from './Components/ProtectedRoute'; 
// OR if ProtectedRoute uses `export default`, then: import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

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


      {/* Protected Dashboard Route */}
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
