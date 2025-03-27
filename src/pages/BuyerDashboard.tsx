import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Tab,
  Tabs,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  ShoppingCart,
  CircleDollarSign,
  Package,
  TrendingUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DashboardCard } from '../components/admin/DashboardCard';
import { ProductMarketplace } from '../components/buyer/ProductMarketplace';
import { OrderHistory } from '../components/buyer/OrderHistory';
import { QualityMetrics } from '../components/buyer/QualityMetrics';
import { LanguageSelector } from '../components/common/LanguageSelector';

const stats = [
  {
    title: 'Active Orders',
    value: '3',
    icon: ShoppingCart,
    color: '#6366f1',
    trend: { value: 2, isPositive: true },
  },
  {
    title: 'Total Spent',
    value: '₹2.5L',
    icon: CircleDollarSign,
    color: '#10b981',
    trend: { value: 15, isPositive: true },
  },
  {
    title: 'Products Tracked',
    value: '12',
    icon: Package,
    color: '#f59e0b',
    trend: { value: 4, isPositive: true },
  },
  {
    title: 'Quality Score',
    value: '4.8/5',
    icon: TrendingUp,
    color: '#8b5cf6',
    trend: { value: 0.2, isPositive: true },
  },
];

function BuyerDashboard() {
  const [tabValue, setTabValue] = React.useState(0);
  const { t } = useTranslation();

  return (
    <Box className="min-h-screen bg-gray-900">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="text-white">
            {t('common.dashboard')}
          </Typography>
          <LanguageSelector />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="mb-8">
          <Typography variant="h4" className="text-white mb-2">
            {t('buyer.dashboard')}
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            {t('buyer.browseProducts')}
          </Typography>
        </Box>

        {/* Stats */}
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
            <Tab label={t('buyer.marketplace')} />
            <Tab label={t('buyer.orderHistory')} />
            <Tab label={t('buyer.qualityMetrics')} />
          </Tabs>

          <Box className="p-6">
            {tabValue === 0 && <ProductMarketplace />}
            {tabValue === 1 && <OrderHistory />}
            {tabValue === 2 && <QualityMetrics />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default BuyerDashboard;