import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { 
  Chip, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { Download, Mail } from 'lucide-react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Transaction ID', width: 150 },
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'type', headerName: 'Type', width: 130 },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 130,
    valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value}
        color={
          params.value === 'Completed'
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
      const [showEmailDialog, setShowEmailDialog] = useState(false);
      const [email, setEmail] = useState('');
      const [showSnackbar, setShowSnackbar] = useState(false);

      const handleSendEmail = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowEmailDialog(false);
        setShowSnackbar(true);
        setEmail('');
      };

      const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`;
        link.download = `invoice_${params.row.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      return (
        <Box className="space-x-2">
          <Button
            startIcon={<Download size={16} />}
            size="small"
            onClick={handleDownload}
          >
            Receipt
          </Button>
          <Button
            startIcon={<Mail size={16} />}
            size="small"
            onClick={() => setShowEmailDialog(true)}
          >
            Email
          </Button>

          <Dialog
            open={showEmailDialog}
            onClose={() => setShowEmailDialog(false)}
          >
            <DialogTitle>Send Invoice</DialogTitle>
            <DialogContent>
              <Typography variant="body2" className="mb-4">
                Enter email address to send the invoice
              </Typography>
              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowEmailDialog(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSendEmail}
                disabled={!email}
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
          >
            <Alert severity="success">
              Invoice sent successfully!
            </Alert>
          </Snackbar>
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 'TXN001',
    date: '2024-03-01',
    type: 'Storage Fee',
    amount: 25000,
    status: 'Completed',
  },
  {
    id: 'TXN002',
    date: '2024-03-05',
    type: 'Product Sale',
    amount: 75000,
    status: 'Pending',
  },
  {
    id: 'TXN003',
    date: '2024-03-10',
    type: 'Storage Fee',
    amount: 30000,
    status: 'Failed',
  },
  {
    id: 'TXN004',
    date: '2024-03-12',
    type: 'Product Sale',
    amount: 45000,
    status: 'Completed',
  },
  {
    id: 'TXN005',
    date: '2024-03-15',
    type: 'Storage Fee',
    amount: 28000,
    status: 'Completed',
  },
];

export function PaymentHistoryTable() {
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