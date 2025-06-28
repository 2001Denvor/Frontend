import { useAuth } from '../Components/AuthContext';
import StatCard from '../Components/StatCard';
import { Grid, Typography, Box } from '@mui/material';

const UserDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'user') return null;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome to 99x, {user.name || 'User'}
      </Typography>

      <Grid container spacing={2} columns={12}>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Your Spend" value="$5,320" change="8.4" isPositive={false} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="New Users" value="2,134" change="8.1" isPositive={true} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Total Orders" value="9,876" change="3.2" isPositive={true} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Refund Requests" value="120" change="1.5" isPositive={false} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Page Views" value="142,000" change="6.9" isPositive={true} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Page Views" value="142,000" change="6.9" isPositive={true} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Active Users" value="8,320" change="3.2" isPositive={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
