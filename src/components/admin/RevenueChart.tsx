import React from 'react';
import { LineChart } from '@mui/x-charts';
import { Paper, Typography } from '@mui/material';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const revenue = [150000, 180000, 220000, 250000, 280000, 310000, 350000, 380000, 420000, 450000, 480000, 520000];
const transactions = [120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450];

export function RevenueChart() {
  return (
    <Paper className="p-6">
      <Typography variant="h6" className="mb-4">
        Revenue & Transactions Overview
      </Typography>
      <LineChart
        height={300}
        series={[
          {
            data: revenue,
            label: 'Revenue (₹)',
            area: true,
            color: '#6366f1',
          },
          {
            data: transactions,
            label: 'Transactions',
            color: '#22d3ee',
          },
        ]}
        xAxis={[{
          data: months,
          scaleType: 'band',
        }]}
      />
    </Paper>
  );
}