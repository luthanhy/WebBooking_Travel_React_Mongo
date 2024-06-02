import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [totalAmount, setTotalAmount] = useState(null);
  const [tourName, setTourName] = useState(null);

  useEffect(() => {
    if (location.state) {
      setTotalAmount(location.state.totalAmount);
      setTourName(location.state.tourName);
    } else {
      // Redirect to booking page if state is not available
      navigate('/booking');
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Details:', paymentDetails);
    alert('Payment Successful!');
  };

  if (!totalAmount || !tourName) {
    return null; // or you can render a loading spinner or a message
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Payment
        </Typography>
        <Typography variant="h6" gutterBottom>
          Total Amount: ${totalAmount}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Tour: {tourName}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="cardNumber"
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            id="cardHolder"
            label="Card Holder"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            id="expiryDate"
            label="Expiry Date"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            id="cvv"
            label="CVV"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pay Now
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Payment;
