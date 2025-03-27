import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  forecast: {
    date: string;
    temperature: number;
    condition: string;
  }[];
}

export function WeatherWidget() {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated weather data - In production, replace with actual API call
    const fetchWeather = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data
        const mockWeather: WeatherData = {
          temperature: 28,
          humidity: 65,
          condition: 'Partly Cloudy',
          forecast: [
            { date: '2024-03-15', temperature: 29, condition: 'Sunny' },
            { date: '2024-03-16', temperature: 27, condition: 'Cloudy' },
            { date: '2024-03-17', temperature: 26, condition: 'Rain' },
            { date: '2024-03-18', temperature: 28, condition: 'Partly Cloudy' },
          ]
        };
        
        setWeather(mockWeather);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="text-gray-500" />;
      case 'rain':
        return <CloudRain className="text-blue-500" />;
      default:
        return <Wind className="text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <Paper className="p-4 flex justify-center items-center">
        <CircularProgress size={24} />
      </Paper>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Paper className="p-6">
      <Typography variant="h6" className="mb-4">
        {t('common.weather')}
      </Typography>

      <Box className="flex items-center mb-6">
        <Box className="flex items-center flex-1">
          {getWeatherIcon(weather.condition)}
          <Typography variant="h3" className="ml-3">
            {weather.temperature}°C
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {t('common.humidity')}: {weather.humidity}%
          </Typography>
          <Typography variant="body1">
            {weather.condition}
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle2" className="mb-3">
        {t('common.forecast')}
      </Typography>
      
      <Box className="grid grid-cols-4 gap-2">
        {weather.forecast.map((day, index) => (
          <Box key={index} className="text-center p-2 bg-gray-50 rounded">
            <Typography variant="caption" display="block">
              {new Date(day.date).toLocaleDateString()}
            </Typography>
            {getWeatherIcon(day.condition)}
            <Typography variant="body2">
              {day.temperature}°C
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}