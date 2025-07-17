import React from 'react';
import { useAuth } from './AuthContext'; // Adjust the path if needed
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';

const MyProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  const displayName = user.fullname || 'Unknown';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, backgroundColor: '#63635dff', boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
            {avatarLetter}
          </Avatar>
          <Typography variant="h5" gutterBottom>
            {displayName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Role: {user.role || 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProfile;
