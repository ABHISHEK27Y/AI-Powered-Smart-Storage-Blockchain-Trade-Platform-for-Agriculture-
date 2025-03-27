import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface InvoiceGeneratorProps {
  orderDetails: {
    orderId: string;
    date: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    buyerInfo: {
      name: string;
      address: string;
      email: string;
    };
    sellerInfo: {
      name: string;
      address: string;
      gstin: string;
    };
  };
}

export function InvoiceGenerator({ orderDetails }: InvoiceGeneratorProps) {
  const invoiceRef = React.useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (invoiceRef.current) {
      const canvas = await html2canvas(invoiceRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`invoice_${orderDetails.orderId}.pdf`);
    }
  };

  return (
    <Box>
      <div ref={invoiceRef}>
        <Paper className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <Box className="flex justify-between items-start mb-8">
            <Box>
              <Typography variant="h4" className="font-bold text-blue-600 mb-2">
                INVOICE
              </Typography>
              <Typography variant="body2">
                Invoice #: {orderDetails.orderId}
              </Typography>
              <Typography variant="body2">
                Date: {orderDetails.date}
              </Typography>
            </Box>
            <Box className="text-right">
              <Typography variant="h6" className="font-bold mb-2">
                Smart Cold Storage
              </Typography>
              <Typography variant="body2">
                123 Storage Lane
              </Typography>
              <Typography variant="body2">
                New Delhi, India
              </Typography>
              <Typography variant="body2">
                GSTIN: 07AABCS1429B1Z1
              </Typography>
            </Box>
          </Box>

          {/* Buyer & Seller Info */}
          <Box className="grid grid-cols-2 gap-8 mb-8">
            <Box>
              <Typography variant="h6" className="font-bold mb-2">
                Bill To
              </Typography>
              <Typography>{orderDetails.buyerInfo.name}</Typography>
              <Typography>{orderDetails.buyerInfo.address}</Typography>
              <Typography>{orderDetails.buyerInfo.email}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="font-bold mb-2">
                Seller
              </Typography>
              <Typography>{orderDetails.sellerInfo.name}</Typography>
              <Typography>{orderDetails.sellerInfo.address}</Typography>
              <Typography>GSTIN: {orderDetails.sellerInfo.gstin}</Typography>
            </Box>
          </Box>

          {/* Items Table */}
          <Table className="mb-8">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.quantity} kg</TableCell>
                  <TableCell align="right">₹{item.price}/kg</TableCell>
                  <TableCell align="right">
                    ₹{(item.quantity * item.price).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right" className="font-bold">
                  Total
                </TableCell>
                <TableCell align="right" className="font-bold">
                  ₹{orderDetails.total.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Footer */}
          <Box className="mt-8 pt-8 border-t">
            <Typography variant="body2" className="text-center text-gray-600">
              Thank you for your business!
            </Typography>
            <Typography variant="body2" className="text-center text-gray-600">
              For any queries, please contact support@smartcoldstorage.com
            </Typography>
          </Box>
        </Paper>
      </div>
    </Box>
  );
}