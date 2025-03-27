import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Truck,
  Package,
  MapPin,
  TrendingUp,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { DashboardCard } from '../components/admin/DashboardCard';
import { DeliveryTable } from '../components/logistics/DeliveryTable';
import { FleetManagement } from '../components/logistics/FleetManagement';
import { PerformanceMetrics } from '../components/logistics/PerformanceMetrics';

const stats = [
  {
    title: 'Active Deliveries',
    value: '24',
    icon: Truck,
    color: '#6366f1',
    trend: { value: 3, isPositive: true },
  },
  {
    title: 'On-Time Rate',
    value: '96%',
    icon: Clock,
    color: '#10b981',
    trend: { value: 2, isPositive: true },
  },
  {
    title: 'Total Distance',
    value: '1,234 km',
    icon: MapPin,
    color: '#f59e0b',
    trend: { value: 15, isPositive: true },
  },
  {
    title: 'Pending Issues',
    value: '3',
    icon: AlertTriangle,
    color: '#ef4444',
    trend: { value: 1, isPositive: false },
  },
];

function LogisticsDashboard() {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Box className="min-h-screen bg-gray-900">
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="mb-8">
          <Typography variant="h4" className="text-white mb-2">
            Logistics Dashboard
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Track deliveries and manage fleet performance
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

        {/* Main Content */}
        <Paper className="mb-8">
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            className="border-b border-gray-700"
          >
            <Tab label="Active Deliveries" />
            <Tab label="Fleet Management" />
            <Tab label="Performance" />
          </Tabs>

          <Box className="p-6">
            {tabValue === 0 && <DeliveryTable />}
            {tabValue === 1 && <FleetManagement />}
            {tabValue === 2 && <PerformanceMetrics />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LogisticsDashboard;