import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  Package,
  IndianRupee,
  Thermometer,
  Truck,
  Download,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaymentModal } from '../farmer/PaymentModal';
import { OrderTrackingModal } from './OrderTrackingModal';
import { InvoiceGenerator } from './InvoiceGenerator';

const products = [
  {
    id: 'P001',
    name: 'Premium Potatoes',
    farmer: 'Ramesh Kumar',
    quantity: 5000,
    price: 25,
    rating: 4.5,
    location: 'Punjab',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
    storageConditions: {
      temperature: 4,
      humidity: 85,
    },
    certification: 'Organic',
    description: 'Fresh, high-quality potatoes perfect for all cooking needs.',
  },
  {
    id: 'P002',
    name: 'Fresh Onions',
    farmer: 'Suresh Patel',
    quantity: 3000,
    price: 35,
    rating: 4.8,
    location: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510',
    storageConditions: {
      temperature: 2,
      humidity: 80,
    },
    certification: 'Premium',
    description: 'Premium quality onions with excellent shelf life.',
  },
  {
    id: 'P003',
    name: 'Organic Apples',
    farmer: 'Priya Singh',
    quantity: 2000,
    price: 80,
    rating: 4.7,
    location: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    storageConditions: {
      temperature: 1,
      humidity: 90,
    },
    certification: 'Organic',
    description: 'Sweet and juicy apples grown in the hills of Himachal.',
  },
  {
    id: 'P004',
    name: 'Fresh Carrots',
    farmer: 'Amit Kumar',
    quantity: 2500,
    price: 40,
    rating: 4.6,
    location: 'Haryana',
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979',
    storageConditions: {
      temperature: 3,
      humidity: 85,
    },
    certification: 'Premium',
    description: 'Crisp and nutritious carrots, perfect for salads and cooking.',
  },
  {
    id: 'P005',
    name: 'Organic Tomatoes',
    farmer: 'Neha Sharma',
    quantity: 1800,
    price: 45,
    rating: 4.4,
    location: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
    storageConditions: {
      temperature: 4,
      humidity: 88,
    },
    certification: 'Organic',
    description: 'Vine-ripened tomatoes grown using organic farming methods.',
  },
  {
    id: 'P006',
    name: 'Premium Cauliflower',
    farmer: 'Rajesh Verma',
    quantity: 2200,
    price: 35,
    rating: 4.3,
    location: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3',
    storageConditions: {
      temperature: 2,
      humidity: 85,
    },
    certification: 'Premium',
    description: 'Fresh and clean cauliflower with compact, white heads.',
  },
];

export function ProductMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [showPayment, setShowPayment] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<number>(100);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = (product: any) => {
    setSelectedProduct(product);
    setShowPurchaseDialog(true);
  };

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowPurchaseDialog(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowInvoice(true);
  };

  const orderDetails = {
    orderId: `ORD${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toLocaleDateString(),
    items: [
      {
        name: selectedProduct?.name || '',
        quantity: purchaseQuantity,
        price: selectedProduct?.price || 0,
      },
    ],
    total: purchaseQuantity * (selectedProduct?.price || 0),
    buyerInfo: {
      name: 'John Doe',
      address: '123 Buyer Street, New Delhi',
      email: 'john@example.com',
    },
    sellerInfo: {
      name: selectedProduct?.farmer || '',
      address: `${selectedProduct?.location || ''}, India`,
      gstin: '29ABCDE1234F1Z5',
    },
  };

  return (
    <>
      <Box className="mb-6 space-y-4">
        <Box className="flex space-x-4">
          <TextField
            fullWidth
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="price">Price: Low to High</MenuItem>
              <MenuItem value="-price">Price: High to Low</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="quantity">Quantity Available</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} md={4} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper className="p-6 h-full">
                <Box className="relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Chip
                    label={product.certification}
                    color="primary"
                    className="absolute top-2 right-2"
                  />
                </Box>

                <Box className="flex justify-between items-start mb-4">
                  <Box>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      by {product.farmer}
                    </Typography>
                  </Box>
                </Box>

                <Box className="mb-4">
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <Typography variant="body2" color="textSecondary">
                    Location: {product.location}
                  </Typography>
                </Box>

                <Typography variant="body2" className="mb-4">
                  {product.description}
                </Typography>

                <Box className="grid grid-cols-2 gap-4 mb-4">
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Available Quantity
                    </Typography>
                    <Typography variant="h6">
                      {product.quantity.toLocaleString()} kg
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Price per kg
                    </Typography>
                    <Box className="flex items-center">
                      <IndianRupee size={16} className="mr-1" />
                      <Typography variant="h6">{product.price}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="mb-4">
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                    Storage Conditions
                  </Typography>
                  <Box className="flex space-x-4">
                    <Box className="flex items-center">
                      <Thermometer size={16} className="mr-1" />
                      <Typography>{product.storageConditions.temperature}°C</Typography>
                    </Box>
                    <Box className="flex items-center">
                      <Package size={16} className="mr-1" />
                      <Typography>{product.storageConditions.humidity}% Humidity</Typography>
                    </Box>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handlePurchase(product)}
                >
                  Purchase Now
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onClose={() => setShowPurchaseDialog(false)}>
        <DialogTitle>Purchase {selectedProduct?.name}</DialogTitle>
        <DialogContent>
          <Box className="py-4">
            <TextField
              fullWidth
              label="Quantity (kg)"
              type="number"
              value={purchaseQuantity}
              onChange={(e) => setPurchaseQuantity(parseInt(e.target.value))}
              InputProps={{
                inputProps: { min: 100, max: selectedProduct?.quantity },
              }}
            />
            <Typography variant="body2" color="textSecondary" className="mt-2">
              Minimum order: 100 kg
            </Typography>
            <Box className="mt-4 p-4 bg-gray-50 rounded">
              <Typography variant="subtitle2">Order Summary</Typography>
              <Box className="flex justify-between mt-2">
                <Typography>Price per kg:</Typography>
                <Typography>₹{selectedProduct?.price}</Typography>
              </Box>
              <Box className="flex justify-between mt-1">
                <Typography>Quantity:</Typography>
                <Typography>{purchaseQuantity} kg</Typography>
              </Box>
              <Box className="flex justify-between mt-1 font-bold">
                <Typography>Total Amount:</Typography>
                <Typography>₹{(purchaseQuantity * (selectedProduct?.price || 0)).toLocaleString()}</Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPurchaseDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirmPurchase}
            disabled={isProcessing || purchaseQuantity < 100}
          >
            {isProcessing ? (
              <CircularProgress size={24} />
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Modal */}
      {selectedProduct && (
        <PaymentModal
          open={showPayment}
          onClose={() => setShowPayment(false)}
          amount={purchaseQuantity * selectedProduct.price}
          type="product"
          onSuccess={handlePaymentSuccess}
        />
      )} {/* Invoice Dialog */}
      <Dialog open={showInvoice} onClose={() => setShowInvoice(false)} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <Typography variant="h6">Invoice</Typography>
          <Box className="space-x-2">
            <Button
              startIcon={<Download />}
              onClick={() => {
                setShowInvoice(false);
                setShowTracking(true);
              }}
            >
              Download Invoice
            </Button>
            <Button
              startIcon={<Truck />}
              variant="contained"
              onClick={() => {
                setShowInvoice(false);
                setShowTracking(true);
              }}
            >
              Track Order
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <InvoiceGenerator orderDetails={orderDetails} />
        </DialogContent>
      </Dialog>

      {/* Tracking Modal */}
      <OrderTrackingModal
        open={showTracking}
        onClose={() => setShowTracking(false)}
        orderId={orderDetails.orderId}
      />
    </>
  );
}