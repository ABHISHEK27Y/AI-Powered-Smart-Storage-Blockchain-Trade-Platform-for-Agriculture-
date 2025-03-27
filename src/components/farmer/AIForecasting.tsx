import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import { Brain, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as tf from '@tensorflow/tfjs';

interface AIForecastingProps {
  open: boolean;
  onClose: () => void;
  productData: {
    name: string;
    price: number;
    quantity: number;
    storageConditions: {
      temperature: number;
      humidity: number;
    };
  };
}

export function AIForecasting({ open, onClose, productData }: AIForecastingProps) {
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<any>(null);

  useEffect(() => {
    if (open) {
      generatePredictions();
    }
  }, [open, productData]);

  const generatePredictions = async () => {
    setLoading(true);
    try {
      // Initialize TensorFlow.js model
      const model = await tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [4], units: 8, activation: 'relu' }),
          tf.layers.dense({ units: 3, activation: 'sigmoid' })
        ]
      });

      // Simulate market data analysis
      const marketData = await simulateMarketAnalysis();
      setPredictions(marketData);
    } catch (error) {
      console.error('Error generating predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateMarketAnalysis = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const basePrice = productData.price;
    const today = new Date();
    
    return {
      spoilageRisk: {
        risk: 35,
        timeLeft: '15 days',
        recommendation: 'Consider selling within 10 days for optimal value'
      },
      priceForecasting: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(today.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: basePrice + Math.random() * 10 - 5
      })),
      optimalSelling: {
        date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: basePrice * 1.15,
        confidence: 85
      }
    };
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box className="flex flex-col items-center justify-center py-12">
            <CircularProgress size={48} className="mb-4" />
            <Typography>Analyzing market data and generating predictions...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box className="flex items-center">
          <Brain className="mr-2" />
          <Typography variant="h6">AI Market Analysis & Predictions</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-6 py-4">
          {/* Spoilage Risk */}
          <Box className="bg-red-50 p-4 rounded-lg">
            <Typography variant="h6" className="flex items-center mb-2">
              <Clock className="mr-2 text-red-500" />
              Spoilage Risk Analysis
            </Typography>
            <Box className="flex items-center justify-between">
              <Typography variant="body1">
                Current Risk Level: {predictions?.spoilageRisk.risk}%
              </Typography>
              <Typography variant="body1">
                Estimated Time Left: {predictions?.spoilageRisk.timeLeft}
              </Typography>
            </Box>
            <Typography variant="body2" className="mt-2 text-red-700">
              {predictions?.spoilageRisk.recommendation}
            </Typography>
          </Box>

          {/* Price Forecasting */}
          <Box className="bg-blue-50 p-4 rounded-lg">
            <Typography variant="h6" className="flex items-center mb-4">
              <TrendingUp className="mr-2 text-blue-500" />
              Price Forecast (7 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={predictions?.priceForecasting}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Optimal Selling */}
          <Box className="bg-green-50 p-4 rounded-lg">
            <Typography variant="h6" className="flex items-center mb-2">
              <DollarSign className="mr-2 text-green-500" />
              Optimal Selling Recommendation
            </Typography>
            <Box className="space-y-2">
              <Typography>
                Best selling date: {predictions?.optimalSelling.date}
              </Typography>
              <Typography>
                Predicted price: ₹{predictions?.optimalSelling.price.toFixed(2)}/kg
              </Typography>
              <Typography>
                Confidence level: {predictions?.optimalSelling.confidence}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}