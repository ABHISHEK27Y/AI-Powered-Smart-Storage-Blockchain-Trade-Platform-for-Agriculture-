import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  LinearProgress,
  Chip,
  Paper,
  Grid,
  Button,
  Snackbar,
  Alert,
  DialogActions,
} from '@mui/material';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Truck, Package, MapPin, Phone, User, Calendar, PhoneCall, PhoneOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
  { name: 'Guwahati', lat: 26.1445, lng: 91.7362 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Patna', lat: 25.5941, lng: 85.1376 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
];

interface OrderTrackingModalProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

export function OrderTrackingModal({ open, onClose, orderId }: OrderTrackingModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentCity, setCurrentCity] = useState(0);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callsRemaining, setCallsRemaining] = useState(() => {
    const stored = localStorage.getItem('callsRemaining');
    if (stored) {
      const { calls, date } = JSON.parse(stored);
      if (date === new Date().toDateString()) {
        return calls;
      }
    }
    return 3;
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem('callsRemaining', JSON.stringify({
      calls: callsRemaining,
      date: new Date().toDateString()
    }));
  }, [callsRemaining]);

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [open]);

  useEffect(() => {
    const cityIndex = Math.floor((progress / 100) * (cities.length - 1));
    setCurrentCity(cityIndex);
  }, [progress]);

  useEffect(() => {
    if (isMapLoaded && window.google && currentCity < cities.length - 1) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: cities[currentCity],
          destination: cities[currentCity + 1],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          }
        }
      );
    }
  }, [currentCity, isMapLoaded]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const driverInfo = {
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    vehicleNumber: 'DL 01 AB 1234',
    expectedDelivery: '2024-03-20 18:00',
  };

  const handleCallDriver = () => {
    if (callsRemaining > 0) {
      setShowCallDialog(true);
    } else {
      setSnackbarMessage('Daily call limit reached. Please try again tomorrow.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
  };

  const initiateCall = () => {
    setIsCallActive(true);
    setCallsRemaining(prev => prev - 1);
    setShowCallDialog(false);
    setSnackbarMessage('Call connected with driver');
    setSnackbarSeverity('success');
    setShowSnackbar(true);

    setTimeout(() => {
      setIsCallActive(false);
      setCallTimer(0);
      setSnackbarMessage('Call ended');
      setSnackbarSeverity('info');
      setShowSnackbar(true);
    }, 30000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallTimer(0);
    setSnackbarMessage('Call ended');
    setSnackbarSeverity('info');
    setShowSnackbar(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 26.1445,
    lng: 91.7362,
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4">
        <Box className="flex items-center">
          <Truck className="mr-2" />
          <Typography component="div" variant="h6">Live Order Tracking</Typography>
        </Box>
      </Box>
      <DialogContent>
        <Box className="py-4 space-y-6">
          <Paper className="p-4 bg-gray-50">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box className="flex items-center mb-2">
                  <Package className="mr-2 text-blue-500" size={20} />
                  <Typography component="div" variant="subtitle1">Order #{orderId}</Typography>
                </Box>
                <Box className="flex items-center mb-2">
                  <MapPin className="mr-2 text-green-500" size={20} />
                  <Typography component="div">
                    {cities[currentCity].name} → {cities[currentCity + 1]?.name || 'Destination'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="flex items-center mb-2">
                  <User className="mr-2 text-purple-500" size={20} />
                  <Typography component="div">{driverInfo.name}</Typography>
                </Box>
                <Box className="flex items-center mb-2">
                  <Phone className="mr-2 text-red-500" size={20} />
                  <Typography component="div">{driverInfo.phone}</Typography>
                  <Button
                    startIcon={isCallActive ? <PhoneOff /> : <PhoneCall />}
                    color={isCallActive ? 'error' : 'primary'}
                    variant="contained"
                    size="small"
                    className="ml-2"
                    onClick={isCallActive ? endCall : handleCallDriver}
                  >
                    {isCallActive ? `End Call (${formatTime(callTimer)})` : `Call (${callsRemaining} left)`}
                  </Button>
                </Box>
                <Box className="flex items-center mb-2">
                  <Truck className="mr-2 text-orange-500" size={20} />
                  <Typography component="div">{driverInfo.vehicleNumber}</Typography>
                </Box>
                <Box className="flex items-center">
                  <Calendar className="mr-2 text-blue-500" size={20} />
                  <Typography component="div">Expected: {driverInfo.expectedDelivery}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Box>
            <Box className="flex justify-between mb-2">
              <Typography component="div" variant="subtitle2">Delivery Progress</Typography>
              <Typography component="div" variant="subtitle2">{Math.round(progress)}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#6366f1',
                },
              }}
            />
            <Box className="flex justify-between mt-2">
              <Typography component="div" variant="caption">Guwahati</Typography>
              <Typography component="div" variant="caption">Delhi</Typography>
            </Box>
          </Box>

          <Box className="flex justify-between">
            {cities.map((city, index) => (
              <Box
                key={index}
                className="flex flex-col items-center"
                style={{ width: `${100 / cities.length}%` }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: index <= currentCity ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Chip
                    label={city.name}
                    color={index <= currentCity ? 'primary' : 'default'}
                    size="small"
                  />
                </motion.div>
              </Box>
            ))}
          </Box>

          {!isMapLoaded && (
            <LoadScript
              googleMapsApiKey="AIzaSyBGne1OmLrntYs8s5cq-dq5ZtJ3HbqkSv4"
              onLoad={() => setIsMapLoaded(true)}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
              >
                {cities.map((city, index) => (
                  <Marker
                    key={index}
                    position={{ lat: city.lat, lng: city.lng }}
                    icon={{
                      url: index <= currentCity
                        ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    }}
                  />
                ))}
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </LoadScript>
          )}

          {isMapLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={5}
            >
              {cities.map((city, index) => (
                <Marker
                  key={index}
                  position={{ lat: city.lat, lng: city.lng }}
                  icon={{
                    url: index <= currentCity
                      ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                      : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  }}
                />
              ))}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          )}

          <Paper className="p-4">
            <Typography component="div" variant="subtitle2" className="mb-2">
              Recent Updates
            </Typography>
            <Box className="space-y-2">
              <AnimatePresence>
                {progress > 20 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Typography component="div" variant="body2" className="text-green-600">
                      ✓ Package picked up from Guwahati warehouse
                    </Typography>
                  </motion.div>
                )}
                {progress > 40 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Typography component="div" variant="body2" className="text-green-600">
                      ✓ Crossed Kolkata checkpoint
                    </Typography>
                  </motion.div>
                )}
                {progress > 60 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Typography component="div" variant="body2" className="text-green-600">
                      ✓ Reached Patna distribution center
                    </Typography>
                  </motion.div>
                )}
                {progress > 80 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Typography component="div" variant="body2" className="text-blue-600">
                      → Currently in Lucknow
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <Dialog open={showCallDialog} onClose={() => setShowCallDialog(false)}>
        <DialogTitle>Call Driver</DialogTitle>
        <DialogContent>
          <Typography component="div">
            You are about to call {driverInfo.name}. You have {callsRemaining} calls remaining today.
          </Typography>
          <Typography component="div" variant="caption" color="textSecondary" className="block mt-2">
            Note: Calls are limited to 30 seconds for demo purposes
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCallDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={initiateCall}
            startIcon={<PhoneCall />}
          >
            Call Now
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}