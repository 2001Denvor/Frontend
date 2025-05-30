// src/Components/ChartCard.jsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 200 },
  { name: 'May', users: 450 },
  { name: 'Jun', users: 600 },
];

const ChartCard = () => {
  return (
    <Card sx={{ marginTop: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly Active Users
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={2} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
