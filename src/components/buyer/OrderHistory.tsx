import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { Chip, Button, Box, Typography } from '@mui/material';
import { Eye, Download } from 'lucide-react';
import { OrderTrackingModal } from './OrderTrackingModal';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'product', headerName: 'Product', width: 150 },
  { field: 'farmer', headerName: 'Farmer', width: 150 },
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
          params.value === 'Delivered'
            ? 'success'
            : params.value === 'In Transit'
            ? 'warning'
            : params.value === 'Processing'
            ? 'info'
            : 'default'
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
      const [showTracking, setShowTracking] = useState(false);

      const generateInvoice = () => {
        const doc = new jsPDF();
        
        // Add company logo/header
        doc.setFontSize(20);
        doc.setTextColor(0, 82, 204);
        doc.text('Smart Cold Storage', 20, 20);
        
        // Add invoice details
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Invoice #: ${params.row.id}`, 20, 40);
        doc.text(`Date: ${format(new Date(params.row.date), 'dd/MM/yyyy')}`, 20, 50);
        
        // Add buyer details
        doc.text('Bill To:', 20, 70);
        doc.text('John Doe', 20, 80);
        doc.text('123 Buyer Street', 20, 90);
        doc.text('New Delhi, India', 20, 100);
        
        // Add product details
        doc.text('Product Details:', 20, 120);
        doc.text(`Product: ${params.row.product}`, 20, 130);
        doc.text(`Quantity: ${params.row.quantity} kg`, 20, 140);
        doc.text(`Amount: ₹${params.row.amount.toLocaleString()}`, 20, 150);
        doc.text(`Farmer: ${params.row.farmer}`, 20, 160);
        
        // Add footer
        doc.setFontSize(10);
        doc.text('Thank you for your business!', 20, 200);
        doc.text('For any queries, please contact support@smartcoldstorage.com', 20, 210);
        
        // Save the PDF
        doc.save(`invoice_${params.row.id}.pdf`);
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
            startIcon={<Download size={16} />}
            size="small"
            variant="outlined"
            onClick={generateInvoice}
          >
            Invoice
          </Button>
          <OrderTrackingModal
            open={showTracking}
            onClose={() => setShowTracking(false)}
            orderId={params.row.id}
          />
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 'ORD001',
    date: '2024-03-01',
    product: 'Premium Potatoes',
    farmer: 'Ramesh Kumar',
    amount: 125000,
    quantity: 5000,
    status: 'Delivered',
  },
  {
    id: 'ORD002',
    date: '2024-03-05',
    product: 'Fresh Onions',
    farmer: 'Suresh Patel',
    amount: 105000,
    quantity: 3000,
    status: 'In Transit',
  },
  {
    id: 'ORD003',
    date: '2024-03-10',
    product: 'Organic Apples',
    farmer: 'Priya Singh',
    amount: 160000,
    quantity: 2000,
    status: 'Processing',
  },
];

export function OrderHistory() {
  return (
    <Box>
      <Typography variant="h6" className="mb-4">
        Order History
      </Typography>
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
    </Box>
  );
}