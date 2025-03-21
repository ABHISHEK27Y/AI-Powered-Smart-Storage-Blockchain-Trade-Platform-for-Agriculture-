import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { Upload } from 'lucide-react';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

export function AddProductModal({ open, onClose, onAdd }: AddProductModalProps) {
  const [productData, setProductData] = useState({
    name: '',
    quantity: '',
    price: '',
    type: '',
    image: '',
    description: '',
  });

  const handleSubmit = async () => {
    // Simulate blockchain transaction
    console.log('Creating product on blockchain...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAdd({
      ...productData,
      id: `P${Math.random().toString(36).substr(2, 9)}`,
      status: 'stored',
      storageConditions: {
        temperature: 2,
        humidity: 75,
        moisture: 10,
        gasLevel: 200,
      },
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <Box className="space-y-4 mt-4">
          <TextField
            fullWidth
            label="Product Name"
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          />
          
          <FormControl fullWidth>
            <InputLabel>Product Type</InputLabel>
            <Select
              value={productData.type}
              label="Product Type"
              onChange={(e) => setProductData({ ...productData, type: e.target.value })}
            >
              <MenuItem value="fruits">Fruits</MenuItem>
              <MenuItem value="vegetables">Vegetables</MenuItem>
              <MenuItem value="grains">Grains</MenuItem>
              <MenuItem value="dairy">Dairy</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity (kg)"
            type="number"
            value={productData.quantity}
            onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
          />

          <TextField
            fullWidth
            label="Price per kg (₹)"
            type="number"
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          />

          <TextField
            fullWidth
            label="Product Description"
            multiline
            rows={4}
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          />

          <Box className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="text"
              placeholder="Enter image URL"
              className="w-full p-2 border rounded"
              value={productData.image}
              onChange={(e) => setProductData({ ...productData, image: e.target.value })}
            />
            <Typography variant="body2" color="textSecondary" className="mt-2">
              Enter URL for product image
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<Upload size={16} />}
        >
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}