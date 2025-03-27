import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const deliveryData = [
  { month: 'Jan', onTime: 95, delayed: 5 },
  { month: 'Feb', onTime: 92, delayed: 8 },
  { month: 'Mar', onTime: 97, delayed: 3 },
  { month: 'Apr', onTime: 94, delayed: 6 },
  { month: 'May', onTime: 96, delayed: 4 },
  { month: 'Jun', onTime: 98, delayed: 2 },
];

const temperatureData = [
  { time: '00:00', temp: 3.5 },
  { time: '04:00', temp: 3.8 },
  { time: '08:00', temp: 4.2 },
  { time: '12:00', temp: 4.5 },
  { time: '16:00', temp: 4.1 },
  { time: '20:00', temp: 3.9 },
];

const metrics = [
  {
    label: 'On-Time Delivery Rate',
    value: 96,
    color: '#6366f1',
  },
  {
    label: 'Temperature Compliance',
    value: 98,
    color: '#10b981',
  },
  {
    label: 'Fleet Utilization',
    value: 85,
    color: '#f59e0b',
  },
  {
    label: 'Customer Satisfaction',
    value: 92,
    color: '#8b5cf6',
  },
];

export function PerformanceMetrics() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper className="p-6">
          <Typography variant="h6" className="mb-4">
            Delivery Performance
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="onTime" name="On Time" fill="#6366f1" />
              <Bar dataKey="delayed" name="Delayed" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className="p-6">
          <Typography variant="h6" className="mb-4">
            Key Metrics
          </Typography>
          <Box className="space-y-6">
            {metrics.map((metric) => (
              <Box key={metric.label}>
                <Box className="flex justify-between mb-2">
                  <Typography>{metric.label}</Typography>
                  <Typography>{metric.value}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: metric.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className="p-6">
          <Typography variant="h6" className="mb-4">
            Temperature Monitoring
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
                name="Temperature (°C)"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}