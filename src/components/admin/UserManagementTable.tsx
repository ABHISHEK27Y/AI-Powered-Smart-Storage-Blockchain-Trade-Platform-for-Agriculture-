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
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ActionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  title: string;
  message: string;
  actionType: 'approve' | 'reject' | 'suspend';
  requireReason?: boolean;
}

function ActionDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  actionType,
  requireReason = false,
}: ActionDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography className="mb-4">{message}</Typography>
        {requireReason && (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            label="Reason"
            placeholder="Please provide a reason..."
            required
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color={actionType === 'approve' ? 'success' : 'error'}
          onClick={handleConfirm}
          disabled={requireReason && !reason}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 180 },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value}
        color={
          params.value === 'Cold Storage Owner'
            ? 'primary'
            : params.value === 'Farmer'
            ? 'success'
            : params.value === 'Buyer'
            ? 'info'
            : 'warning'
        }
        size="small"
      />
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
          params.value === 'Active'
            ? 'success'
            : params.value === 'Pending'
            ? 'warning'
            : params.value === 'Suspended'
            ? 'error'
            : 'default'
        }
        size="small"
      />
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 250,
    renderCell: (params: GridRenderCellParams) => {
      const [showDialog, setShowDialog] = useState(false);
      const [dialogProps, setDialogProps] = useState<Partial<ActionDialogProps>>({});
      const [showSnackbar, setShowSnackbar] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');
      const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

      const handleAction = async (reason?: string) => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          let newStatus;
          let message;

          switch (dialogProps.actionType) {
            case 'approve':
              newStatus = 'Active';
              message = 'User approved successfully';
              break;
            case 'reject':
              newStatus = 'Rejected';
              message = `User rejected: ${reason}`;
              break;
            case 'suspend':
              newStatus = 'Suspended';
              message = `User suspended: ${reason}`;
              break;
            default:
              newStatus = params.row.status;
              message = 'Status updated';
          }

          params.row.status = newStatus;
          setSnackbarMessage(message);
          setSnackbarSeverity('success');
        } catch (error) {
          setSnackbarMessage('Failed to update user status');
          setSnackbarSeverity('error');
        }

        setShowSnackbar(true);
        setShowDialog(false);
      };

      const openDialog = (props: Partial<ActionDialogProps>) => {
        setDialogProps(props);
        setShowDialog(true);
      };

      return (
        <Box>
          {params.row.status === 'Pending' ? (
            <>
              <Button
                size="small"
                color="success"
                className="mr-2"
                startIcon={<CheckCircle size={16} />}
                onClick={() =>
                  openDialog({
                    title: 'Approve User',
                    message: 'Are you sure you want to approve this user?',
                    actionType: 'approve',
                  })
                }
              >
                Approve
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<XCircle size={16} />}
                onClick={() =>
                  openDialog({
                    title: 'Reject User',
                    message: 'Please provide a reason for rejection:',
                    actionType: 'reject',
                    requireReason: true,
                  })
                }
              >
                Reject
              </Button>
            </>
          ) : params.row.status === 'Active' ? (
            <Button
              size="small"
              color="error"
              startIcon={<AlertTriangle size={16} />}
              onClick={() =>
                openDialog({
                  title: 'Suspend User',
                  message: 'Please provide a reason for suspension:',
                  actionType: 'suspend',
                  requireReason: true,
                })
              }
            >
              Suspend
            </Button>
          ) : params.row.status === 'Suspended' ? (
            <Button
              size="small"
              color="success"
              startIcon={<CheckCircle size={16} />}
              onClick={() =>
                openDialog({
                  title: 'Reactivate User',
                  message: 'Are you sure you want to reactivate this user?',
                  actionType: 'approve',
                })
              }
            >
              Reactivate
            </Button>
          ) : null}

          <ActionDialog
            open={showDialog}
            onClose={() => setShowDialog(false)}
            onConfirm={handleAction}
            {...dialogProps}
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
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'Cold Storage Owner',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Amit Patel',
    email: 'amit@example.com',
    role: 'Farmer',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Priya Singh',
    email: 'priya@example.com',
    role: 'Buyer',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Suresh Reddy',
    email: 'suresh@example.com',
    role: 'Logistics Partner',
    status: 'Suspended',
  },
];

export function UserManagementTable() {
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