import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Avatar,
  Rating,
  Divider,
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

const qualityData = [
  { month: 'Feb', score: 4.5 },
  { month: 'Mar', score: 4.7 },
];

const metrics = [
  {
    label: 'Product Quality',
    value: 95,
    color: '#6366f1',
  },
  {
    label: 'Delivery Time',
    value: 88,
    color: '#10b981',
  },
  {
    label: 'Storage Compliance',
    value: 92,
    color: '#f59e0b',
  },
  {
    label: 'Temperature Control',
    value: 96,
    color: '#8b5cf6',
  },
];

const reviews = [
  {
    id: 1,
    user: 'Rahul Sharma',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    date: '2024-03-10',
    product: 'Premium Potatoes',
    comment: 'Excellent quality potatoes. The cold storage maintained perfect temperature throughout.',
  },
  {
    id: 2,
    user: 'Priya Patel',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    date: '2024-03-08',
    product: 'Fresh Onions',
    comment: 'Good quality and well preserved. Delivery was slightly delayed.',
  },
  {
    id: 3,
    user: 'Amit Kumar',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    date: '2024-03-05',
    product: 'Organic Apples',
    comment: 'The apples were perfectly fresh. Great storage and delivery service!',
  },
];

const monthlyTemperatureData = [
  { day: '1', temp: 3.5 },
  { day: '5', temp: 3.8 },
  { day: '10', temp: 4.2 },
  { day: '15', temp: 4.5 },
  { day: '20', temp: 4.1 },
  { day: '25', temp: 3.9 },
  { day: '30', temp: 4.0 },
];

export function QualityMetrics() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper className="p-6">
          <Typography variant="h6" className="mb-4">
            Quality Score Trend (Last 30 Days)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="score" fill="#6366f1" />
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
            Temperature Monitoring (Last 30 Days)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTemperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
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

      <Grid item xs={12}>
        <Paper className="p-6">
          <Typography variant="h6" className="mb-4">
            Recent Buyer Reviews
          </Typography>
          <Box className="space-y-4">
            {reviews.map((review) => (
              <Box key={review.id}>
                <Box className="flex items-start space-x-4">
                  <Avatar src={review.avatar} alt={review.user} />
                  <Box className="flex-1">
                    <Box className="flex justify-between items-center mb-2">
                      <Box>
                        <Typography variant="subtitle1" className="font-semibold">
                          {review.user}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {review.product} • {review.date}
                        </Typography>
                      </Box>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {review.comment}
                    </Typography>
                  </Box>
                </Box>
                <Divider className="mt-4" />
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}