import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { 
  Users, Warehouse, Store, Truck, Settings
} from 'lucide-react';

const roleCards = [
  {
    title: 'Farmers & Traders',
    description: 'Manage Storage & Sell Products',
    icon: Users,
    path: '/farmer',
    color: '#10b981',
  },
  {
    title: 'Cold Storage Owners',
    description: 'Monitor Storage & Billing',
    icon: Warehouse,
    path: '/cold-storage',
    color: '#6366f1',
  },
  {
    title: 'Buyers',
    description: 'Purchase & Track Quality',
    icon: Store,
    path: '/buyer',
    color: '#f59e0b',
  },
  {
    title: 'Logistics Partners',
    description: 'Track Deliveries & Quality',
    icon: Truck,
    path: '/logistics',
    color: '#ef4444',
  },
  {
    title: 'Admin Panel',
    description: 'Control & Monitor System',
    icon: Settings,
    path: '/admin',
    color: '#8b5cf6',
  },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box className="pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" component="h1" className="mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent font-bold">
              Revolutionizing Cold Storage & Trade
            </Typography>
            <Typography variant="h5" className="mb-8 text-gray-300">
              Powered by AI & Blockchain Technology
            </Typography>
          </motion.div>

          {/* Role Cards */}
          <Grid container spacing={4}>
            {roleCards.map((role, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Paper 
                    className="p-6 cursor-pointer transition-all hover:shadow-xl"
                    onClick={() => navigate(role.path)}
                    sx={{ bgcolor: 'rgba(30, 41, 59, 0.8)' }}
                  >
                    <role.icon style={{ color: role.color }} className="w-12 h-12 mb-4 mx-auto" />
                    <Typography variant="h6" className="mb-2 font-bold text-white">
                      {role.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-300">
                      {role.description}
                    </Typography>
                    <Button 
                      variant="contained"
                      className="mt-4"
                      sx={{ bgcolor: role.color, '&:hover': { bgcolor: role.color } }}
                      fullWidth
                    >
                      Access Dashboard
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;