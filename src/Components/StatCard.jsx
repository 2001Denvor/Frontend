import { Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ title, value, change, isPositive }) => (
  <Card elevation={3}>
    <CardContent>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h5">{value}</Typography>
      <Typography sx={{ color: isPositive ? 'success.main' : 'error.main' }}>
        {isPositive ? '+' : '-'}{Math.abs(change)}%
      </Typography>
    </CardContent>
  </Card>
);

export default StatCard;
