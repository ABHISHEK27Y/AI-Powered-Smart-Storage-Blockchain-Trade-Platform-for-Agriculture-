import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function DashboardCard({ title, value, icon: Icon, color, trend }: DashboardCardProps) {
  return (
    <Paper className="p-6 relative overflow-hidden">
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h6" className="font-medium text-gray-400">
          {title}
        </Typography>
        <Icon size={24} style={{ color }} />
      </Box>
      <Typography variant="h4" className="font-bold mb-2">
        {value}
      </Typography>
      {trend && (
        <Typography
          variant="body2"
          className={`font-medium ${
            trend.isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
        </Typography>
      )}
      <div
        className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10"
        style={{ backgroundColor: color }}
      />
    </Paper>
  );
}