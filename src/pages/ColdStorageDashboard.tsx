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
  Thermometer,
  Droplets,
  Package,
  AlertTriangle,
  CircleDollarSign,
} from 'lucide-react';
import { DashboardCard } from '../components/admin/DashboardCard';
import { StorageUnit } from '../components/cold-storage/StorageUnit';
import { BookingTable } from '../components/cold-storage/BookingTable';
import { BillingCard } from '../components/cold-storage/BillingCard';

const stats = [
  {
    title: 'Average Temperature',
    value: '2.5°C',
    icon: Thermometer,
    color: '#6366f1',
    trend: { value: 0.5, isPositive: false },
  },
  {
    title: 'Average Humidity',
    value: '85%',
    icon: Droplets,
    color: '#10b981',
    trend: { value: 2, isPositive: true },
  },
  {
    title: 'Total Capacity',
    value: '85%',
    icon: Package,
    color: '#f59e0b',
    trend: { value: 5, isPositive: true },
  },
  {
    title: 'Alerts',
    value: '3',
    icon: AlertTriangle,
    color: '#ef4444',
    trend: { value: 1, isPositive: false },
  },
];

const storageUnits = [
  {
    id: 'CS001',
    name: 'Cold Storage Unit 1',
    temperature: 2.5,
    humidity: 85,
    capacity: 1000,
    occupied: 850,
    status: 'optimal',
    sensorHealth: {
      temperature: true,
      humidity: true,
      gas: true,
      nextMaintenance: '2024-04-15',
    },
    environmentalData: {
      co2Level: 450,
      ethylene: 25,
      oxygenLevel: 20.5,
      airQuality: 95,
    },
    spoilageRisk: {
      products: [
        { name: 'Apples', risk: 20, timeLeft: '25 days' },
        { name: 'Potatoes', risk: 15, timeLeft: '30 days' },
      ],
    },
  },
  {
    id: 'CS002',
    name: 'Cold Storage Unit 2',
    temperature: 4.2,
    humidity: 82,
    capacity: 1000,
    occupied: 920,
    status: 'warning',
    sensorHealth: {
      temperature: true,
      humidity: false,
      gas: true,
      nextMaintenance: '2024-03-30',
    },
    environmentalData: {
      co2Level: 850,
      ethylene: 75,
      oxygenLevel: 19.5,
      airQuality: 82,
    },
    spoilageRisk: {
      products: [
        { name: 'Tomatoes', risk: 85, timeLeft: '2 days' },
        { name: 'Carrots', risk: 45, timeLeft: '10 days' },
      ],
    },
  },
  {
    id: 'CS003',
    name: 'Cold Storage Unit 3',
    temperature: 5.8,
    humidity: 78,
    capacity: 1000,
    occupied: 750,
    status: 'critical',
    sensorHealth: {
      temperature: true,
      humidity: true,
      gas: false,
      nextMaintenance: '2024-03-25',
    },
    environmentalData: {
      co2Level: 950,
      ethylene: 90,
      oxygenLevel: 18.5,
      airQuality: 75,
    },
    spoilageRisk: {
      products: [
        { name: 'Onions', risk: 90, timeLeft: '1 day' },
        { name: 'Cabbage', risk: 75, timeLeft: '3 days' },
      ],
    },
  },
];

const billingData = [
  {
    invoiceId: 'INV001',
    farmer: 'Ramesh Kumar',
    amount: 25000,
    dueDate: '2024-03-15',
    status: 'pending',
  },
  {
    invoiceId: 'INV002',
    farmer: 'Suresh Patel',
    amount: 35000,
    dueDate: '2024-03-10',
    status: 'paid',
  },
  {
    invoiceId: 'INV003',
    farmer: 'Priya Singh',
    amount: 42000,
    dueDate: '2024-02-28',
    status: 'overdue',
  },
];

function ColdStorageDashboard() {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Box className="min-h-screen bg-gray-900">
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="mb-8">
          <Typography variant="h4" className="text-white mb-2">
            Cold Storage Dashboard
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Monitor storage conditions and manage bookings
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

        {/* Storage Units */}
        <Box className="mb-8">
          <Typography variant="h5" className="text-white mb-4">
            Storage Units
          </Typography>
          <Grid container spacing={4}>
            {storageUnits.map((unit) => (
              <Grid item xs={12} md={4} key={unit.id}>
                <StorageUnit {...unit} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tabs */}
        <Paper className="mb-8">
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            className="border-b border-gray-700"
          >
            <Tab label="Bookings" />
            <Tab label="Billing" />
          </Tabs>

          <Box className="p-4">
            {tabValue === 0 ? (
              <BookingTable />
            ) : (
              <Grid container spacing={4}>
                {billingData.map((bill) => (
                  <Grid item xs={12} md={4} key={bill.invoiceId}>
                    <BillingCard {...bill} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ColdStorageDashboard;