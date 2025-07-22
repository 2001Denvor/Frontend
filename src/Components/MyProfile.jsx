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
  // Grab user info and loading state from your Auth context
  const { user, loading } = useAuth();

  // Show spinner while loading user data
  if (loading) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If user is not available (not logged in), show message
  if (!user) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          User not found. Please log in.
        </Typography>
      </Box>
    );
  }

  // Pick display name from available user properties
  // Make sure your backend returns "fullname" or "name" or "email"
  const displayName =
    user.fullname?.trim() || user.name?.trim() || user.email?.trim() || 'Unknown';

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
          <Typography variant="h5" color="white" gutterBottom align='center'>
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
