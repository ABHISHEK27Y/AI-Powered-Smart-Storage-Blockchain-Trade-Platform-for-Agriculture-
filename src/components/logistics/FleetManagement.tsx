import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Truck,
  Battery,
  Thermometer,
  MapPin,
  AlertTriangle,
  Settings,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
} from 'lucide-react';

interface VehicleCardProps {
  id: string;
  driver: string;
  status: 'active' | 'maintenance' | 'idle';
  temperature: number;
  fuel: number;
  location: string;
  alerts?: string[];
}

interface CallDialogProps {
  open: boolean;
  onClose: () => void;
  driver: string;
  callsRemaining: number;
  onCall: () => void;
}

function CallDialog({ open, onClose, driver, callsRemaining, onCall }: CallDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Call Driver</DialogTitle>
      <DialogContent>
        <Typography>
          You are about to call {driver}. You have {callsRemaining} calls remaining today.
        </Typography>
        <Typography variant="caption" color="textSecondary" className="block mt-2">
          Note: Calls are limited to 30 seconds for demo purposes
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onCall}
          startIcon={<PhoneCall />}
        >
          Call Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function VehicleCard({
  id,
  driver,
  status,
  temperature,
  fuel,
  location,
  alerts = [],
}: VehicleCardProps) {
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [callsRemaining, setCallsRemaining] = useState(() => {
    const stored = localStorage.getItem(`callsRemaining_${id}`);
    if (stored) {
      const { calls, date } = JSON.parse(stored);
      if (date === new Date().toDateString()) {
        return calls;
      }
    }
    return 3;
  });

  React.useEffect(() => {
    localStorage.setItem(`callsRemaining_${id}`, JSON.stringify({
      calls: callsRemaining,
      date: new Date().toDateString()
    }));
  }, [callsRemaining, id]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'error';
      default:
        return 'warning';
    }
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

    // Auto end call after 30 seconds
    setTimeout(() => {
      endCall();
    }, 30000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsRecording(false);
    setCallTimer(0);
    setSnackbarMessage('Call ended');
    setSnackbarSeverity('info');
    setShowSnackbar(true);
  };

  const toggleRecording = () => {
    if (isCallActive) {
      setIsRecording(!isRecording);
      setSnackbarMessage(isRecording ? 'Recording stopped' : 'Recording started');
      setSnackbarSeverity('info');
      setShowSnackbar(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Paper className="p-6">
      <Box className="flex justify-between items-center mb-4">
        <Box className="flex items-center">
          <Truck className="mr-2" />
          <div>
            <Typography variant="h6">{id}</Typography>
            <Typography variant="body2" color="textSecondary">
              Driver: {driver}
            </Typography>
          </div>
        </Box>
        <Chip
          label={status.toUpperCase()}
          color={getStatusColor()}
          size="small"
        />
      </Box>

      <Box className="space-y-4 mb-4">
        <Box>
          <Box className="flex justify-between mb-1">
            <Typography variant="body2" color="textSecondary">
              Fuel Level
            </Typography>
            <Typography variant="body2">{fuel}%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={fuel}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: fuel > 20 ? '#10b981' : '#ef4444',
              },
            }}
          />
        </Box>

        <Box className="flex justify-between items-center">
          <Box className="flex items-center">
            <Thermometer size={16} className="mr-1" />
            <Typography>{temperature}°C</Typography>
          </Box>
          <Box className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <Typography>{location}</Typography>
          </Box>
        </Box>
      </Box>

      {alerts.length > 0 && (
        <Box className="mb-4">
          <Typography variant="body2" color="error" className="flex items-center mb-2">
            <AlertTriangle size={16} className="mr-1" />
            Alerts
          </Typography>
          {alerts.map((alert, index) => (
            <Typography key={index} variant="body2" color="error" className="ml-6">
              • {alert}
            </Typography>
          ))}
        </Box>
      )}

      <Box className="flex space-x-2">
        <Button
          variant="outlined"
          startIcon={<MapPin size={16} />}
          fullWidth
        >
          Track
        </Button>
        <Button
          variant="outlined"
          startIcon={<Settings size={16} />}
          fullWidth
        >
          Manage
        </Button>
        <Button
          variant="contained"
          color={isCallActive ? 'error' : 'primary'}
          startIcon={isCallActive ? <PhoneOff size={16} /> : <PhoneCall size={16} />}
          onClick={isCallActive ? endCall : handleCallDriver}
          fullWidth
        >
          {isCallActive ? `End (${formatTime(callTimer)})` : `Call (${callsRemaining})`}
        </Button>
        {isCallActive && (
          <Button
            variant="contained"
            color={isRecording ? 'error' : 'primary'}
            startIcon={isRecording ? <MicOff size={16} /> : <Mic size={16} />}
            onClick={toggleRecording}
          >
            {isRecording ? 'Stop' : 'Record'}
          </Button>
        )}
      </Box>

      <CallDialog
        open={showCallDialog}
        onClose={() => setShowCallDialog(false)}
        driver={driver}
        callsRemaining={callsRemaining}
        onCall={initiateCall}
      />

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
    </Paper>
  );
}

const vehicles: VehicleCardProps[] = [
  {
    id: 'TRK001',
    driver: 'John Doe',
    status: 'active',
    temperature: 4.2,
    fuel: 75,
    location: 'Delhi NCR',
  },
  {
    id: 'TRK002',
    driver: 'Jane Smith',
    status: 'maintenance',
    temperature: 3.8,
    fuel: 15,
    location: 'Mumbai',
    alerts: ['Low fuel level', 'Maintenance due'],
  },
  {
    id: 'TRK003',
    driver: 'Mike Johnson',
    status: 'active',
    temperature: 2.5,
    fuel: 90,
    location: 'Bangalore',
  },
  {
    id: 'TRK004',
    driver: 'Sarah Wilson',
    status: 'idle',
    temperature: 5.1,
    fuel: 45,
    location: 'Chennai',
    alerts: ['Temperature above threshold'],
  },
];

export function FleetManagement() {
  return (
    <Grid container spacing={4}>
      {vehicles.map((vehicle) => (
        <Grid item xs={12} md={6} key={vehicle.id}>
          <VehicleCard {...vehicle} />
        </Grid>
      ))}
    </Grid>
  );
}