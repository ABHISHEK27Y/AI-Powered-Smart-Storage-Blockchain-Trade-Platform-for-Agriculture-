import React from 'react';
import { Paper, Typography, Box, Chip, LinearProgress, Alert, Grid } from '@mui/material';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  GaugeCircle,
  Leaf,
  Battery,
  AlertOctagon
} from 'lucide-react';

interface StorageUnitProps {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  capacity: number;
  occupied: number;
  status: 'optimal' | 'warning' | 'critical';
  sensorHealth: {
    temperature: boolean;
    humidity: boolean;
    gas: boolean;
    nextMaintenance: string;
  };
  environmentalData: {
    co2Level: number;
    ethylene: number;
    oxygenLevel: number;
    airQuality: number;
  };
  spoilageRisk: {
    products: Array<{
      name: string;
      risk: number;
      timeLeft: string;
    }>;
  };
}

export function StorageUnit({
  id,
  name,
  temperature,
  humidity,
  capacity,
  occupied,
  status,
  sensorHealth,
  environmentalData,
  spoilageRisk,
}: StorageUnitProps) {
  const occupancyPercentage = (occupied / capacity) * 100;
  
  const getStatusColor = () => {
    switch (status) {
      case 'optimal':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'critical':
        return '#ef4444';
      default:
        return '#6366f1';
    }
  };

  // Create a custom gauge visualization using SVG
  const createGauge = (value: number, max: number, color: string) => {
    const radius = 40;
    const strokeWidth = 8;
    const normalizedValue = value / max;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - normalizedValue);

    return (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          d={`M 20 80 A ${radius} ${radius} 0 0 1 80 80`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <path
          d={`M 20 80 A ${radius} ${radius} 0 0 1 80 80`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        <text
          x="50"
          y="85"
          textAnchor="middle"
          fill={color}
          fontSize="14"
          fontWeight="bold"
        >
          {value}
        </text>
      </svg>
    );
  };

  const highRiskProducts = spoilageRisk.products.filter(p => p.risk > 70);

  return (
    <Paper className="p-6">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6">{name}</Typography>
        <Chip
          label={status.toUpperCase()}
          sx={{ backgroundColor: getStatusColor(), color: 'white' }}
        />
      </Box>

      {highRiskProducts.length > 0 && (
        <Alert 
          severity="error" 
          icon={<AlertOctagon />}
          className="mb-4"
        >
          <Typography variant="subtitle2" className="font-medium">
            High Spoilage Risk Detected
          </Typography>
          <Box className="mt-2">
            {highRiskProducts.map((product, index) => (
              <Typography key={index} variant="body2">
                • {product.name} - {product.timeLeft} remaining
              </Typography>
            ))}
          </Box>
        </Alert>
      )}

      <Box className="grid grid-cols-2 gap-4 mb-6">
        <Box className="flex items-center">
          <Thermometer className="mr-2" color={temperature > 8 ? '#ef4444' : '#10b981'} />
          <div>
            <Typography variant="body2" color="textSecondary">
              Temperature
            </Typography>
            <Typography variant="h6">
              {temperature}°C
            </Typography>
          </div>
        </Box>
        <Box className="flex items-center">
          <Droplets className="mr-2" color={humidity > 90 ? '#ef4444' : '#10b981'} />
          <div>
            <Typography variant="body2" color="textSecondary">
              Humidity
            </Typography>
            <Typography variant="h6">
              {humidity}%
            </Typography>
          </div>
        </Box>
      </Box>

      <Box className="mb-6">
        <Typography variant="subtitle2" className="mb-2">
          Environmental Parameters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className="p-3 bg-gray-50 rounded">
              <Box className="flex items-center mb-1">
                <Wind size={16} className="mr-1" />
                <Typography variant="body2">CO₂ Level</Typography>
              </Box>
              {createGauge(environmentalData.co2Level, 1000, 
                environmentalData.co2Level > 800 ? '#ef4444' : '#10b981')}
              <Typography variant="caption" display="block" className="text-center">
                PPM
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="p-3 bg-gray-50 rounded">
              <Box className="flex items-center mb-1">
                <Leaf size={16} className="mr-1" />
                <Typography variant="body2">Ethylene</Typography>
              </Box>
              {createGauge(environmentalData.ethylene, 100,
                environmentalData.ethylene > 70 ? '#ef4444' : '#10b981')}
              <Typography variant="caption" display="block" className="text-center">
                PPB
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className="mb-6">
        <Typography variant="subtitle2" className="mb-2">
          Sensor Health
        </Typography>
        <Box className="grid grid-cols-2 gap-4">
          {Object.entries(sensorHealth).map(([key, value]) => {
            if (key === 'nextMaintenance') return null;
            return (
              <Box key={key} className="flex items-center">
                <Battery className={value ? 'text-green-500' : 'text-red-500'} size={16} />
                <Typography variant="body2" className="ml-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)} Sensor
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Typography variant="caption" color="textSecondary" display="block" className="mt-2">
          Next maintenance: {sensorHealth.nextMaintenance}
        </Typography>
      </Box>

      <Box className="mb-4">
        <Typography variant="body2" color="textSecondary" className="mb-1">
          Capacity Usage
        </Typography>
        <LinearProgress
          variant="determinate"
          value={occupancyPercentage}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getStatusColor(),
            },
          }}
        />
        <Typography variant="body2" className="mt-1">
          {occupied} / {capacity} cubic meters
        </Typography>
      </Box>
    </Paper>
  );
}