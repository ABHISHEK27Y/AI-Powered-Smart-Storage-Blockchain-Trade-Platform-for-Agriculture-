import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AlertTriangle,
  ThermometerSun,
  Droplets,
  Wind,
  GaugeCircle,
  CheckCircle,
} from 'lucide-react';

interface AIRecommendationsProps {
  open: boolean;
  onClose: () => void;
  conditions: {
    temperature: number;
    humidity: number;
    moisture: number;
    gasLevel: number;
  };
  productType: string;
}

export function AIRecommendations({ open, onClose, conditions, productType }: AIRecommendationsProps) {
  // AI-based analysis of conditions
  const getRecommendations = () => {
    const recommendations = [];
    
    if (conditions.temperature > 8) {
      recommendations.push({
        issue: 'High Temperature',
        solution: 'Reduce storage temperature by 2-3°C. Check cooling system efficiency.',
        icon: ThermometerSun,
        severity: 'high',
      });
    }
    
    if (conditions.humidity > 90) {
      recommendations.push({
        issue: 'High Humidity',
        solution: 'Activate dehumidifiers. Ensure proper air circulation.',
        icon: Droplets,
        severity: 'medium',
      });
    }
    
    if (conditions.moisture > 15) {
      recommendations.push({
        issue: 'Excessive Moisture',
        solution: 'Check for water leaks. Improve drainage system.',
        icon: Wind,
        severity: 'high',
      });
    }
    
    if (conditions.gasLevel > 500) {
      recommendations.push({
        issue: 'High Gas Levels',
        solution: 'Increase ventilation. Check for ethylene producing products nearby.',
        icon: GaugeCircle,
        severity: 'critical',
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-blue-50">
        <Box className="flex items-center">
          <AlertTriangle className="mr-2 text-blue-500" />
          <Typography variant="h6">AI-Powered Recommendations</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className="py-4">
          <Typography variant="subtitle1" className="mb-4">
            Analysis for: <strong>{productType}</strong>
          </Typography>

          <List>
            {recommendations.map((rec, index) => (
              <ListItem
                key={index}
                className={`mb-4 rounded-lg ${
                  rec.severity === 'critical'
                    ? 'bg-red-50'
                    : rec.severity === 'high'
                    ? 'bg-orange-50'
                    : 'bg-yellow-50'
                }`}
              >
                <ListItemIcon>
                  <rec.icon
                    className={
                      rec.severity === 'critical'
                        ? 'text-red-500'
                        : rec.severity === 'high'
                        ? 'text-orange-500'
                        : 'text-yellow-500'
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={rec.issue}
                  secondary={rec.solution}
                  primaryTypographyProps={{
                    className: 'font-semibold',
                  }}
                />
              </ListItem>
            ))}
          </List>

          {recommendations.length === 0 && (
            <Box className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <Typography variant="h6" className="text-green-700">
                All parameters are within optimal range
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Continue maintaining current storage conditions
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}