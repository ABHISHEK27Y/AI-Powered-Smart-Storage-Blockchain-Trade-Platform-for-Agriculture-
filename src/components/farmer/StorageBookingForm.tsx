import React from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PaymentModal } from './PaymentModal';

export function StorageBookingForm() {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [duration, setDuration] = React.useState('30');
  const [productType, setProductType] = React.useState('');
  const [quantity, setQuantity] = React.useState<number>(0);
  const [showPayment, setShowPayment] = React.useState(false);

  const calculateStoragePrice = () => {
    const baseRate = duration === '30' ? 2 : duration === '90' ? 1.75 : 1.5;
    return quantity * baseRate * (parseInt(duration) / 30);
  };

  const handleBooking = () => {
    if (quantity > 0 && startDate && productType) {
      setShowPayment(true);
    }
  };

  return (
    <>
      <Paper className="p-6">
        <Typography variant="h6" className="mb-6">
          Book Storage Space
        </Typography>

        <Box className="space-y-4">
          <FormControl fullWidth>
            <InputLabel>Product Type</InputLabel>
            <Select
              value={productType}
              label="Product Type"
              onChange={(e) => setProductType(e.target.value)}
            >
              <MenuItem value="potatoes">Potatoes</MenuItem>
              <MenuItem value="onions">Onions</MenuItem>
              <MenuItem value="apples">Apples</MenuItem>
              <MenuItem value="tomatoes">Tomatoes</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select
              value={duration}
              label="Duration"
              onChange={(e) => setDuration(e.target.value)}
            >
              <MenuItem value="30">30 Days</MenuItem>
              <MenuItem value="60">60 Days</MenuItem>
              <MenuItem value="90">90 Days</MenuItem>
              <MenuItem value="180">180 Days</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Special Requirements"
            multiline
            rows={4}
            placeholder="Enter any special storage requirements or notes..."
          />

          {quantity > 0 && (
            <Box className="p-4 bg-gray-50 rounded">
              <Typography variant="subtitle1" className="mb-2">
                Storage Cost Calculation
              </Typography>
              <Box className="space-y-2">
                <Box className="flex justify-between">
                  <Typography>Rate per kg per month</Typography>
                  <Typography>₹{duration === '30' ? '2.00' : duration === '90' ? '1.75' : '1.50'}</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography>Duration</Typography>
                  <Typography>{duration} days</Typography>
                </Box>
                <Box className="flex justify-between font-bold">
                  <Typography>Total Cost</Typography>
                  <Typography>₹{calculateStoragePrice().toLocaleString()}</Typography>
                </Box>
              </Box>
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleBooking}
            disabled={!quantity || !startDate || !productType}
          >
            Book Storage
          </Button>
        </Box>
      </Paper>

      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        amount={calculateStoragePrice()}
        type="storage"
      />
    </>
  );
}