import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, IndianRupee, Check } from 'lucide-react';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  type: 'storage' | 'product';
  onSuccess?: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentModal({ open, onClose, amount, type, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      const loadRazorpay = async () => {
        setIsLoading(true);
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => {
            setIsLoading(false);
            resolve(true);
          };
          document.body.appendChild(script);
        });
      };
      loadRazorpay();
    }
  }, [open]);

  const handlePayment = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Show success animation before closing
    setTimeout(() => {
      setShowSuccess(false);
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    }, 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex flex-col items-center justify-center p-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 0.5 }}
            >
              <Check className="w-16 h-16 text-green-500" />
            </motion.div>
            <Typography variant="h5" className="mt-4 text-green-500">
              Payment Successful!
            </Typography>
          </motion.div>
        ) : (
          <>
            <DialogTitle className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <Box className="flex items-center">
                <CreditCard className="mr-2" />
                <Typography variant="h6">Make Payment</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box className="py-4 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded"
                >
                  <Typography variant="subtitle1">Amount to Pay</Typography>
                  <Box className="flex items-center">
                    <IndianRupee size={16} className="mr-1" />
                    <Typography variant="h5">{amount.toLocaleString()}</Typography>
                  </Box>
                </motion.div>

                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={paymentMethod}
                    label="Payment Method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <MenuItem value="upi">UPI</MenuItem>
                    <MenuItem value="card">Credit/Debit Card</MenuItem>
                    <MenuItem value="netbanking">Net Banking</MenuItem>
                    <MenuItem value="wallet">Wallet</MenuItem>
                  </Select>
                </FormControl>

                {paymentMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <TextField
                      fullWidth
                      label="UPI ID"
                      placeholder="username@upi"
                      variant="outlined"
                    />
                  </motion.div>
                )}

                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <TextField
                      fullWidth
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                    />
                    <Box className="grid grid-cols-2 gap-4">
                      <TextField
                        label="Expiry Date"
                        placeholder="MM/YY"
                      />
                      <TextField
                        label="CVV"
                        type="password"
                        inputProps={{ maxLength: 3 }}
                      />
                    </Box>
                  </motion.div>
                )}
              </Box>
            </DialogContent>
            <DialogActions className="p-4">
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Pay Now'
                )}
              </Button>
            </DialogActions>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  );
}