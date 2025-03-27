import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { CircleDollarSign, Download, MessageSquare, CheckCircle, Phone } from 'lucide-react';

interface BillingCardProps {
  invoiceId: string;
  farmer: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export function BillingCard({
  invoiceId,
  farmer,
  amount,
  dueDate,
  status,
}: BillingCardProps) {
  const [showSMSDialog, setShowSMSDialog] = useState(false);
  const [showMarkPaidDialog, setShowMarkPaidDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [currentStatus, setCurrentStatus] = useState(status);

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'paid':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`;
    link.download = `invoice_${invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendSMS = async () => {
    try {
      // Simulate SMS API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSMSDialog(false);
      setSnackbarMessage('Invoice details sent via SMS');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      setPhoneNumber('');
    } catch (error) {
      setSnackbarMessage('Failed to send SMS');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStatus('paid');
      setShowMarkPaidDialog(false);
      setSnackbarMessage('Invoice marked as paid');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to update status');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  return (
    <Paper className="p-6">
      <Box className="flex justify-between items-center mb-4">
        <Box className="flex items-center">
          <CircleDollarSign className="mr-2" />
          <Typography variant="h6">Invoice #{invoiceId}</Typography>
        </Box>
        <Typography
          variant="subtitle1"
          className={`font-semibold ${getStatusColor()}`}
        >
          {currentStatus.toUpperCase()}
        </Typography>
      </Box>

      <Box className="mb-4">
        <Typography variant="body2" color="textSecondary">
          Farmer
        </Typography>
        <Typography variant="body1" className="font-semibold">
          {farmer}
        </Typography>
      </Box>

      <Box className="mb-4">
        <Typography variant="body2" color="textSecondary">
          Amount
        </Typography>
        <Typography variant="h5" className="font-bold">
          ₹{amount.toLocaleString()}
        </Typography>
      </Box>

      <Box className="mb-4">
        <Typography variant="body2" color="textSecondary">
          Due Date
        </Typography>
        <Typography variant="body1">{dueDate}</Typography>
      </Box>

      <Box className="flex space-x-2">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
          onClick={handleDownload}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<MessageSquare />}
          onClick={() => setShowSMSDialog(true)}
        >
          Send SMS
        </Button>
        {currentStatus === 'pending' && (
          <Button
            variant="outlined"
            color="success"
            startIcon={<CheckCircle />}
            onClick={() => setShowMarkPaidDialog(true)}
          >
            Mark as Paid
          </Button>
        )}
      </Box>

      {/* SMS Dialog */}
      <Dialog open={showSMSDialog} onClose={() => setShowSMSDialog(false)}>
        <DialogTitle>Send Invoice Details via SMS</DialogTitle>
        <DialogContent>
          <Box className="py-4">
            <Typography variant="body2" className="mb-4">
              Enter phone number to send invoice details
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              placeholder="Enter 10 digit mobile number"
              InputProps={{
                startAdornment: <Phone size={16} className="mr-2 text-gray-400" />,
              }}
              error={phoneNumber.length > 0 && !validatePhoneNumber(phoneNumber)}
              helperText={
                phoneNumber.length > 0 && !validatePhoneNumber(phoneNumber)
                  ? "Please enter a valid 10-digit mobile number"
                  : ""
              }
            />
            <Typography variant="caption" color="textSecondary" className="mt-2 block">
              SMS will include invoice ID, amount, and payment instructions
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSMSDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSendSMS}
            disabled={!validatePhoneNumber(phoneNumber)}
          >
            Send SMS
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mark as Paid Dialog */}
      <Dialog open={showMarkPaidDialog} onClose={() => setShowMarkPaidDialog(false)}>
        <DialogTitle>Mark Invoice as Paid</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to mark this invoice as paid?
          </Typography>
          <Box className="mt-4">
            <Typography variant="body2">
              Invoice #: {invoiceId}
            </Typography>
            <Typography variant="body2">
              Amount: ₹{amount.toLocaleString()}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMarkPaidDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleMarkAsPaid}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity={snackbarSeverity} onClose={() => setShowSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}