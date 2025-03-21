import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { 
  Button, 
  Chip, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Booking ID', width: 130 },
  { field: 'farmer', headerName: 'Farmer', width: 150 },
  { field: 'product', headerName: 'Product', width: 130 },
  { field: 'quantity', headerName: 'Quantity (kg)', width: 130 },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 130,
    valueGetter: (params) => `${params.row.duration} days`,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value}
        color={
          params.value === 'Confirmed'
            ? 'success'
            : params.value === 'Pending'
            ? 'warning'
            : 'error'
        }
        size="small"
      />
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      const [showConfirmDialog, setShowConfirmDialog] = useState(false);
      const [showRejectDialog, setShowRejectDialog] = useState(false);
      const [showSnackbar, setShowSnackbar] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');
      const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

      const handleAccept = async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          setShowConfirmDialog(false);
          setSnackbarMessage('Booking accepted successfully');
          setSnackbarSeverity('success');
          setShowSnackbar(true);
          params.row.status = 'Confirmed';
        } catch (error) {
          setSnackbarMessage('Failed to accept booking');
          setSnackbarSeverity('error');
          setShowSnackbar(true);
        }
      };

      const handleReject = async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          setShowRejectDialog(false);
          setSnackbarMessage('Booking rejected');
          setSnackbarSeverity('success');
          setShowSnackbar(true);
          params.row.status = 'Rejected';
        } catch (error) {
          setSnackbarMessage('Failed to reject booking');
          setSnackbarSeverity('error');
          setShowSnackbar(true);
        }
      };

      return (
        <Box>
          {params.row.status === 'Pending' && (
            <>
              <Button 
                size="small" 
                color="success" 
                className="mr-2"
                onClick={() => setShowConfirmDialog(true)}
              >
                Accept
              </Button>
              <Button 
                size="small" 
                color="error"
                onClick={() => setShowRejectDialog(true)}
              >
                Reject
              </Button>

              {/* Accept Dialog */}
              <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
                <DialogTitle>Confirm Booking</DialogTitle>
                <DialogContent>
                  <Typography>
                    Are you sure you want to accept this booking request from {params.row.farmer}?
                  </Typography>
                  <Box className="mt-4">
                    <Typography variant="body2">
                      Product: {params.row.product}
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {params.row.quantity} kg
                    </Typography>
                    <Typography variant="body2">
                      Duration: {params.row.duration} days
                    </Typography>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
                  <Button onClick={handleAccept} variant="contained" color="success">
                    Accept Booking
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Reject Dialog */}
              <Dialog open={showRejectDialog} onClose={() => setShowRejectDialog(false)}>
                <DialogTitle>Reject Booking</DialogTitle>
                <DialogContent>
                  <Typography>
                    Are you sure you want to reject this booking request?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowRejectDialog(false)}>Cancel</Button>
                  <Button onClick={handleReject} variant="contained" color="error">
                    Reject
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
            </>
          )}
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 'BK001',
    farmer: 'Ramesh Kumar',
    product: 'Potatoes',
    quantity: 5000,
    duration: 30,
    status: 'Pending',
  },
  {
    id: 'BK002',
    farmer: 'Suresh Patel',
    product: 'Apples',
    quantity: 3000,
    duration: 45,
    status: 'Confirmed',
  },
  {
    id: 'BK003',
    farmer: 'Priya Singh',
    product: 'Onions',
    quantity: 4000,
    duration: 60,
    status: 'Rejected',
  },
];

export function BookingTable() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
}