import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { 
  Users, Warehouse, CircleDollarSign, AlertTriangle,
  TrendingUp, ShieldCheck, Truck, BarChart3
} from 'lucide-react';
import { DashboardCard } from '../components/admin/DashboardCard';
import { UserManagementTable } from '../components/admin/UserManagementTable';
import { RevenueChart } from '../components/admin/RevenueChart';

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    icon: Users,
    color: '#6366f1',
    trend: { value: 12, isPositive: true },
  },
  {
    title: 'Active Storage Units',
    value: '156',
    icon: Warehouse,
    color: '#10b981',
    trend: { value: 8, isPositive: true },
  },
  {
    title: 'Revenue (MTD)',
    value: '₹5.2M',
    icon: CircleDollarSign,
    color: '#f59e0b',
    trend: { value: 15, isPositive: true },
  },
  {
    title: 'Pending Disputes',
    value: '23',
    icon: AlertTriangle,
    color: '#ef4444',
    trend: { value: 5, isPositive: false },
  },
];

const performanceStats = [
  {
    title: 'Trade Volume',
    value: '₹12.5M',
    icon: TrendingUp,
    color: '#8b5cf6',
  },
  {
    title: 'Secured Transactions',
    value: '892',
    icon: ShieldCheck,
    color: '#06b6d4',
  },
  {
    title: 'Active Deliveries',
    value: '45',
    icon: Truck,
    color: '#ec4899',
  },
  {
    title: 'Success Rate',
    value: '98.5%',
    icon: BarChart3,
    color: '#14b8a6',
  },
];

function AdminDashboard() {
  return (
    <Box className="min-h-screen bg-gray-900">
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="mb-8">
          <Typography variant="h4" className="text-white mb-2">
            Admin Dashboard
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Monitor platform performance and manage users
          </Typography>
        </Box>

        {/* Main Stats */}
        <Grid container spacing={4} className="mb-8">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <DashboardCard {...stat} />
            </Grid>
          ))}
        </Grid>

        {/* Revenue Chart */}
        <Box className="mb-8">
          <RevenueChart />
        </Box>

        {/* User Management */}
        <Paper className="p-6 mb-8">
          <Typography variant="h6" className="mb-4">
            User Management
          </Typography>
          <UserManagementTable />
        </Paper>

        {/* Performance Metrics */}
        <Grid container spacing={4}>
          {performanceStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <DashboardCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AdminDashboard;