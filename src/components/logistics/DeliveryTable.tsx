import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  Chip,
  Button,
  Box,
  Typography,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import { Eye, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { OrderTrackingModal } from '../buyer/OrderTrackingModal';

interface DeliveryStatusDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  isDelivered: boolean;
}

function DeliveryStatusDialog({ open, onClose, onConfirm, isDelivered }: DeliveryStatusDialogProps) {
  const [reason, setReason] = useState('');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isDelivered ? 'Mark as Delivered' : 'Cancel Delivery'}
      </DialogTitle>
      <DialogContent>
        {isDelivered ? (
          <Typography>Are you sure you want to mark this delivery as completed?</Typography>
        ) : (
          <Box className="py-4">
            <Typography className="mb-4">Please provide a reason for cancellation:</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter cancellation reason..."
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color={isDelivered ? 'success' : 'error'}
          onClick={() => onConfirm(reason)}
          disabled={!isDelivered && !reason}
        >
          {isDelivered ? 'Confirm Delivery' : 'Cancel Delivery'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Delivery ID', width: 130 },
  { field: 'product', headerName: 'Product', width: 150 },
  {
    field: 'temperature',
    headerName: 'Temperature',
    width: 130,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>
        {params.value}°C
      </Typography>
    ),
  },
  {
    field: 'progress',
    headerName: 'Progress',
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Box className="w-full pr-4">
        <LinearProgress
          variant="determinate"
          value={params.value}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#6366f1',
            },
          }}
        />
      </Box>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value}
        color={
          params.value === 'On Time'
            ? 'success'
            : params.value === 'Delayed'
            ? 'warning'
            : params.value === 'Cancelled'
            ? 'error'
            : 'default'
        }
        size="small"
      />
    ),
  },
  { field: 'driver', headerName: 'Driver', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 400,
    renderCell: (params: GridRenderCellParams) => {
      const [showTracking, setShowTracking] = useState(false);
      const [showStatusDialog, setShowStatusDialog] = useState(false);
      const [isDelivered, setIsDelivered] = useState(false);
      const [showSnackbar, setShowSnackbar] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');
      const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

      const handleStatusChange = async (reason?: string) => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          setSnackbarMessage(
            isDelivered
              ? 'Delivery marked as completed successfully'
              : `Delivery cancelled: ${reason}`
          );
          setSnackbarSeverity('success');
          params.row.status = isDelivered ? 'Delivered' : 'Cancelled';
        } catch (error) {
          setSnackbarMessage('Failed to update delivery status');
          setSnackbarSeverity('error');
        }
        
        setShowSnackbar(true);
        setShowStatusDialog(false);
      };

      return (
        <Box className="space-x-2">
          <Button
            startIcon={<Eye size={16} />}
            size="small"
            variant="outlined"
            onClick={() => setShowTracking(true)}
          >
            Track
          </Button>
          <Button
            startIcon={<MapPin size={16} />}
            size="small"
            variant="outlined"
          >
            Route
          </Button>
          {params.row.status !== 'Cancelled' && params.row.status !== 'Delivered' && (
            <>
              <Button
                startIcon={<CheckCircle size={16} />}
                size="small"
                variant="contained"
                color="success"
                onClick={() => {
                  setIsDelivered(true);
                  setShowStatusDialog(true);
                }}
              >
                Mark Delivered
              </Button>
              <Button
                startIcon={<XCircle size={16} />}
                size="small"
                variant="contained"
                color="error"
                onClick={() => {
                  setIsDelivered(false);
                  setShowStatusDialog(true);
                }}
              >
                Cancel
              </Button>
            </>
          )}

          <OrderTrackingModal
            open={showTracking}
            onClose={() => setShowTracking(false)}
            orderId={params.row.id}
          />

          <DeliveryStatusDialog
            open={showStatusDialog}
            onClose={() => setShowStatusDialog(false)}
            onConfirm={handleStatusChange}
            isDelivered={isDelivered}
          />

          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
          >
            <Alert
              onClose={() => setShowSnackbar(false)}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 'DEL001',
    product: 'Premium Potatoes',
    temperature: 4.2,
    progress: 75,
    status: 'On Time',
    driver: 'John Doe',
  },
  {
    id: 'DEL002',
    product: 'Fresh Onions',
    temperature: 3.8,
    progress: 45,
    status: 'Delayed',
    driver: 'Jane Smith',
  },
  {
    id: 'DEL003',
    product: 'Organic Apples',
    temperature: 2.5,
    progress: 90,
    status: 'On Time',
    driver: 'Mike Johnson',
  },
  {
    id: 'DEL004',
    product: 'Premium Tomatoes',
    temperature: 5.1,
    progress: 30,
    status: 'Critical',
    driver: 'Sarah Wilson',
  },
];

export function DeliveryTable() {
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