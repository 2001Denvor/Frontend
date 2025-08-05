import React from 'react';
import { useAuth } from './AuthContext'; // Adjust path if needed
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from '@mui/material';

const MyProfile = () => {
  const { user, loading } = useAuth();

  // Utility function to check if an object is empty
  const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

  // Show spinner while loading user data
  if (loading) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If user is not available or is empty, show message
  if (!user || isEmptyObject(user)) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          User not found. Please log in.
        </Typography>
      </Box>
    );
  }

  // Debug: log user object
  console.log("User object:", user);

  // Get display name safely
  const displayName =
    (typeof user.fullname === 'string' && user.fullname.trim()) ||
    (typeof user.name === 'string' && user.name.trim()) ||
    (typeof user.email === 'string' && user.email.trim()) ||
    'Unknown';

  const avatarLetter = displayName.charAt(0).toUpperCase();
  const userRole = user.role || 'N/A';

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 3,
          backgroundColor: '#63635dff',
          boxShadow: 6,
          borderRadius: 3,
        }}
      >
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'yellow', color: 'black' }}>
            {avatarLetter}
          </Avatar>
          <Typography variant="h5" color="white" gutterBottom align="center">
            {displayName}
          </Typography>
          <Typography variant="body1" color="orange">
            Role: {userRole}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfile;
