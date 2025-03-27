import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Alert,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Package,
  Thermometer,
  IndianRupee,
  Droplets,
  Wind,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  ListPlus,
  XCircle,
  Send,
} from 'lucide-react';
import { PaymentModal } from './PaymentModal';
import { AIRecommendations } from './AIRecommendations';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  quantity: number;
  price: number;
  storageConditions: {
    temperature: number;
    humidity: number;
    gasLevel?: number;
    moisture?: number;
  };
  status: 'stored' | 'in-transit' | 'sold' | 'rejected' | 'listed';
  listingDate?: string;
}

export function ProductCard({
  id,
  name,
  quantity,
  price,
  storageConditions,
  status,
  listingDate,
}: ProductCardProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showUrgentAlert, setShowUrgentAlert] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [alertAudio] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'));

  const thresholds = {
    temperature: { min: 2, max: 8 },
    humidity: { min: 60, max: 90 },
    gasLevel: { max: 500 },
    moisture: { max: 15 },
  };

  const checkConditions = () => {
    const alerts = [];
    
    if (storageConditions.temperature < thresholds.temperature.min) {
      alerts.push('Temperature too low');
    } else if (storageConditions.temperature > thresholds.temperature.max) {
      alerts.push('Temperature too high');
    }
    
    if (storageConditions.humidity < thresholds.humidity.min) {
      alerts.push('Humidity too low');
    } else if (storageConditions.humidity > thresholds.humidity.max) {
      alerts.push('Humidity too high');
    }
    
    if (storageConditions.gasLevel && storageConditions.gasLevel > thresholds.gasLevel.max) {
      alerts.push('Harmful gas levels detected');
    }
    
    if (storageConditions.moisture && storageConditions.moisture > thresholds.moisture.max) {
      alerts.push('Moisture level too high');
    }
    
    return alerts;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'stored':
        return 'success';
      case 'in-transit':
        return 'warning';
      case 'sold':
        return 'info';
      case 'listed':
        return 'primary';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleListForSale = async () => {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload(); // Refresh to show updated status
  };

  const handleSendUrgentAlert = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAlertSent(true);
    setTimeout(() => {
      setShowUrgentAlert(false);
      setAlertSent(false);
    }, 3000);
  };

  const alerts = checkConditions();
  const hasCriticalCondition = alerts.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper 
        className={`p-6 relative overflow-hidden ${
          hasCriticalCondition ? 'border border-red-500' : ''
        }`}
      >
        <Box className="flex justify-between items-center mb-4">
          <Box className="flex items-center">
            <Package className="mr-2" />
            <div>
              <Typography variant="h6">{name}</Typography>
              {listingDate && status === 'listed' && (
                <Typography variant="caption" color="textSecondary">
                  Listed on: {new Date(listingDate).toLocaleDateString()}
                </Typography>
              )}
            </div>
          </Box>
          <Chip
            label={status.toUpperCase().replace('-', ' ')}
            color={getStatusColor()}
            size="small"
          />
        </Box>

        <AnimatePresence>
          {hasCriticalCondition && showAlert && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert 
                severity="error" 
                icon={<AlertOctagon />}
                className="mb-4"
                action={
                  <Box className="flex space-x-1">
                    <Tooltip title="View Recommendations">
                      <IconButton
                        size="small"
                        onClick={() => setShowAIRecommendations(true)}
                      >
                        <HelpCircle size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send Urgent Alert">
                      <IconButton
                        size="small"
                        onClick={() => setShowUrgentAlert(true)}
                      >
                        <Send size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Stop Alert">
                      <IconButton
                        size="small"
                        onClick={() => {
                          alertAudio.pause();
                          setShowAlert(false);
                        }}
                      >
                        <XCircle size={16} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              >
                <Typography variant="subtitle2" className="font-medium">
                  Critical Conditions Detected
                </Typography>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Grid container spacing={2} className="mb-6">
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Quantity
            </Typography>
            <Typography variant="h6">
              {quantity.toLocaleString()} kg
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Price per kg
            </Typography>
            <Box className="flex items-center">
              <IndianRupee size={16} className="mr-1" />
              <Typography variant="h6">{price}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box className="mb-6">
          <Typography variant="body2" color="textSecondary" className="mb-2">
            Storage Conditions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box className="flex items-center">
                <Thermometer size={16} className={`mr-1 ${
                  storageConditions.temperature < thresholds.temperature.min || 
                  storageConditions.temperature > thresholds.temperature.max ? 'text-red-500' : ''
                }`} />
                <Typography>{storageConditions.temperature}°C</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="flex items-center">
                <Droplets size={16} className={`mr-1 ${
                  storageConditions.humidity < thresholds.humidity.min || 
                  storageConditions.humidity > thresholds.humidity.max ? 'text-red-500' : ''
                }`} />
                <Typography>{storageConditions.humidity}% Humidity</Typography>
              </Box>
            </Grid>
            {storageConditions.moisture && (
              <Grid item xs={6}>
                <Box className="flex items-center">
                  <Wind size={16} className={`mr-1 ${
                    storageConditions.moisture > thresholds.moisture.max ? 'text-red-500' : ''
                  }`} />
                  <Typography>{storageConditions.moisture}% Moisture</Typography>
                </Box>
              </Grid>
            )}
            {storageConditions.gasLevel && (
              <Grid item xs={6}>
                <Box className="flex items-center">
                  <AlertTriangle size={16} className={`mr-1 ${
                    storageConditions.gasLevel > thresholds.gasLevel.max ? 'text-red-500' : ''
                  }`} />
                  <Typography>{storageConditions.gasLevel} PPM Gas</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Box className="flex space-x-2">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowPayment(true)}
          >
            Pay Storage Fee
          </Button>
          {status === 'stored' && (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<ListPlus />}
              onClick={handleListForSale}
            >
              List for Sale
            </Button>
          )}
        </Box>
      </Paper>

      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        amount={quantity * 2}
        type="storage"
      />

      <AIRecommendations
        open={showAIRecommendations}
        onClose={() => setShowAIRecommendations(false)}
        conditions={storageConditions}
        productType={name}
      />

      <Dialog
        open={showUrgentAlert}
        onClose={() => setShowUrgentAlert(false)}
      >
        <DialogTitle>Send Urgent Alert</DialogTitle>
        <DialogContent>
          <Typography>
            Send an urgent alert to the cold storage owner about critical conditions?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUrgentAlert(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSendUrgentAlert}
            disabled={alertSent}
          >
            {alertSent ? 'Alert Sent!' : 'Send Alert'}
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}