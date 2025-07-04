import { useAuth } from '../Components/AuthContext';
import StatCard from '../Components/StatCard';
import { Grid, Typography, Box } from '@mui/material';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return null;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Smart Admin Space, {user.name || 'Admin'}
      </Typography>

      <Grid container spacing={2} columns={12}>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Total Users" value="78,250" change="70.5" isPositive={true} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="New Registrations" value="3,104" change="7.8" isPositive={true} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Support Tickets" value="340" change="2.1" isPositive={false} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="Resolved Issues" value="290" change="4.5" isPositive={true} />
        </Grid>
        <Grid colSpan={{ xs: 12, md: 6 }}>
          <StatCard title="System Uptime" value="99.98%" change="0.01" isPositive={true} />
        </Grid>
        <Grid colSpan={{ xs: 10, md: 6 }}>
          <StatCard title="Pending Approvals" value="78" change="1.3" isPositive={false} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
