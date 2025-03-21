import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Tab,
  Tabs,
  Button,
  Fab,
  AppBar,
  Toolbar,
  CircularProgress,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  Package,
  Warehouse,
  CircleDollarSign,
  TrendingUp,
  Plus,
  Feather as Ethereum,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DashboardCard } from '../components/admin/DashboardCard';
import { ProductCard } from '../components/farmer/ProductCard';
import { StorageBookingForm } from '../components/farmer/StorageBookingForm';
import { PaymentHistoryTable } from '../components/farmer/PaymentHistoryTable';
import { AddProductModal } from '../components/farmer/AddProductModal';
import { LanguageSelector } from '../components/common/LanguageSelector';

const stats = [
  {
    title: 'Total Products',
    value: '14',
    icon: Package,
    color: '#6366f1',
    trend: { value: 1, isPositive: true },
  },
  {
    title: 'Storage Used',
    value: '75%',
    icon: Warehouse,
    color: '#10b981',
    trend: { value: 5, isPositive: true },
  },
  {
    title: 'Monthly Revenue',
    value: '₹1.2L',
    icon: CircleDollarSign,
    color: '#f59e0b',
    trend: { value: 12, isPositive: true },
  },
  {
    title: 'Active Sales',
    value: '5',
    icon: TrendingUp,
    color: '#8b5cf6',
    trend: { value: 1, isPositive: true },
  },
];

const initialProducts = [
  {
    id: 'P001',
    name: 'Premium Potatoes',
    quantity: 5000,
    price: 25,
    listingDate: '2024-03-01',
    storageConditions: {
      temperature: 9.5,
      humidity: 92,
      moisture: 18,
      gasLevel: 600,
    },
    status: 'listed',
  },
  {
    id: 'P002',
    name: 'Fresh Onions',
    quantity: 3000,
    price: 35,
    listingDate: '2024-03-05',
    storageConditions: {
      temperature: 2,
      humidity: 80,
      moisture: 12,
      gasLevel: 300,
    },
    status: 'listed',
  },
  {
    id: 'P003',
    name: 'Organic Apples',
    quantity: 2000,
    price: 80,
    listingDate: '2024-03-10',
    storageConditions: {
      temperature: 1,
      humidity: 90,
      moisture: 10,
      gasLevel: 200,
    },
    status: 'listed',
  },
  {
    id: 'P004',
    name: 'Premium Tomatoes',
    quantity: 1500,
    price: 45,
    listingDate: '2024-03-12',
    storageConditions: {
      temperature: 3,
      humidity: 85,
      moisture: 14,
      gasLevel: 250,
    },
    status: 'listed',
  },
  {
    id: 'P005',
    name: 'Fresh Carrots',
    quantity: 2500,
    price: 30,
    listingDate: '2024-03-15',
    storageConditions: {
      temperature: 4,
      humidity: 88,
      moisture: 13,
      gasLevel: 280,
    },
    status: 'listed',
  },
  {
    id: 'P006',
    name: 'Organic Cabbage',
    quantity: 1800,
    price: 28,
    storageConditions: {
      temperature: 2.5,
      humidity: 87,
      moisture: 11,
      gasLevel: 220,
    },
    status: 'stored',
  },
  {
    id: 'P007',
    name: 'Premium Cauliflower',
    quantity: 1200,
    price: 40,
    storageConditions: {
      temperature: 3.5,
      humidity: 86,
      moisture: 12,
      gasLevel: 240,
    },
    status: 'stored',
  },
  {
    id: 'P008',
    name: 'Fresh Peas',
    quantity: 1000,
    price: 55,
    storageConditions: {
      temperature: 2,
      humidity: 89,
      moisture: 13,
      gasLevel: 260,
    },
    status: 'stored',
  },
  {
    id: 'P009',
    name: 'Organic Beans',
    quantity: 800,
    price: 65,
    storageConditions: {
      temperature: 3,
      humidity: 84,
      moisture: 11,
      gasLevel: 230,
    },
    status: 'stored',
  },
  {
    id: 'P010',
    name: 'Premium Mushrooms',
    quantity: 500,
    price: 120,
    storageConditions: {
      temperature: 1.5,
      humidity: 92,
      moisture: 15,
      gasLevel: 270,
    },
    status: 'stored',
  },
];

function FarmerDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState(initialProducts);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isAutoListing, setIsAutoListing] = useState(false);
  const [showBlockchainDialog, setShowBlockchainDialog] = useState(false);
  const { t } = useTranslation();

  const handleAddProduct = (newProduct: any) => {
    setProducts([...products, newProduct]);
  };

  const handleAutoListing = async () => {
    setIsAutoListing(true);
    setShowBlockchainDialog(true);

    // Simulate blockchain transaction process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update products that need attention
    const updatedProducts = products.map(product => {
      const hasCriticalConditions = 
        product.storageConditions.temperature > 8 ||
        product.storageConditions.humidity > 90 ||
        product.storageConditions.moisture > 15 ||
        (product.storageConditions.gasLevel && product.storageConditions.gasLevel > 500);

      if (hasCriticalConditions && product.status === 'stored') {
        return {
          ...product,
          status: 'listed',
          listingDate: new Date().toISOString().split('T')[0],
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    
    // Keep dialog open for a moment to show completion
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowBlockchainDialog(false);
    setIsAutoListing(false);
  };

  return (
    <Box className="min-h-screen bg-gray-900">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="text-white">
            {t('common.dashboard')}
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Ethereum className="animate-pulse" />}
              onClick={handleAutoListing}
              disabled={isAutoListing}
              className="mr-4"
              sx={{
                background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
              }}
            >
              {isAutoListing ? 'AI Analyzing...' : 'Auto List Critical Products'}
            </Button>
          </motion.div>
          <LanguageSelector />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="mb-8">
          <Typography variant="h4" className="text-white mb-2">
            {t('farmer.dashboard')}
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            {t('farmer.manageProducts')}
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={4} className="mb-8">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DashboardCard {...stat} />
              </motion.div>
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
            <Tab label={t('common.products')} />
            <Tab label={t('common.storage')} />
            <Tab label={t('common.payments')} />
          </Tabs>

          <Box className="p-6">
            {tabValue === 0 && (
              <>
                <Box className="mb-4 flex justify-between items-center">
                  <Typography variant="h6">{t('farmer.products')}</Typography>
                  <Button
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    onClick={() => setShowAddProduct(true)}
                  >
                    {t('farmer.addProduct')}
                  </Button>
                </Box>
                <Grid container spacing={4}>
                  {products.map((product) => (
                    <Grid item xs={12} md={4} key={product.id}>
                      <ProductCard {...product} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {tabValue === 1 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <StorageBookingForm />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className="p-6">
                    <Typography variant="h6" className="mb-4">
                      {t('farmer.storagePricing')}
                    </Typography>
                    <Box className="space-y-4">
                      <Box className="flex justify-between">
                        <Typography>{t('farmer.basicStorage')}</Typography>
                        <Typography>₹2/kg/month</Typography>
                      </Box>
                      <Box className="flex justify-between">
                        <Typography>{t('farmer.premiumStorage')}</Typography>
                        <Typography>₹1.75/kg/month</Typography>
                      </Box>
                      <Box className="flex justify-between">
                        <Typography>{t('farmer.longTermStorage')}</Typography>
                        <Typography>₹1.5/kg/month</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}

            {tabValue === 2 && (
              <PaymentHistoryTable />
            )}
          </Box>
        </Paper>
      </Container>

      <AddProductModal
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAdd={handleAddProduct}
      />

      <Fab
        color="primary"
        className="fixed bottom-8 right-8"
        onClick={() => setShowAddProduct(true)}
      >
        <Plus />
      </Fab>

      <Dialog
        open={showBlockchainDialog}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent>
          <Box className="flex flex-col items-center bg-gray-900/90 p-8 rounded-lg backdrop-blur-sm">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Ethereum size={48} className="text-blue-500 mb-4" />
            </motion.div>
            <Typography variant="h6" className="text-white mb-2">
              Processing Blockchain Transaction
            </Typography>
            <Typography variant="body2" className="text-gray-300 text-center mb-4">
              AI is analyzing storage conditions and automatically listing critical products
            </Typography>
            <CircularProgress size={24} className="text-blue-500" />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default FarmerDashboard;