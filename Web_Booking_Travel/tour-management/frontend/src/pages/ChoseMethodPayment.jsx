import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Button, Box, Typography, Grid, Card, CardContent, CardActions } from '@mui/material';
import { getMoMoURL ,getPayPalURL } from '../hooks/hookPaymentURL';

let urlPMomo  = '';
let urlPayPal = '';
const ChoseMethodPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  const [totalAmount, setTotalAmount] = useState(null);
  const [tourName, setTourName] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState({
    fullName: '',
    phoneNumber: '',
    userEmail: '',
    guestSize: '',
    BookAt: ''
  });
  const [credentials] = useState({
    partnerCode: "",
    payUrl: "",
  });
  const [data] = useState({
    links:[]
  });
  async function fetchMoMoURL() {
    try {
      urlPMomo = await getMoMoURL(credentials);
    } catch (error) {
      console.error("Error fetching MoMo URL:", error);
    }
  
    try {
      urlPayPal = await getPayPalURL(data);
    } catch (error) {
      console.error("Error fetching PayPal URL:", error);
    }
  
  }
  useEffect(() => {
    return () => {
      fetchMoMoURL();
    };
  });
  useEffect(() => {
    if (location.state) {
      setTotalAmount(location.state.totalAmount);
      setTourName(location.state.tourName);
      setBuyerInfo({
        fullName: location.state.fullName,
        phoneNumber: location.state.phoneNumber,
        userEmail: location.state.userEmail,
        guestSize: location.state.guestSize,
        BookAt: location.state.BookAt
      });
    } else {
      navigate('/booking');
    }
  }, [location.state, navigate]);
  const GetMethod = (methodType) => {
    if(methodType === 'MoMo') {
      window.location.href = urlPMomo;
    }else if(methodType === 'Paypal'){
      window.location.href = urlPayPal;
    }
  };
  

  if (!totalAmount || !tourName) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Left Side: Booking Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Booking Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Total Amount:</strong> ${totalAmount}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Tour:</strong> {tourName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Full Name:</strong> {buyerInfo.fullName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone Number:</strong> {buyerInfo.phoneNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {buyerInfo.userEmail}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Guest Size:</strong> {buyerInfo.guestSize}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Book At:</strong> {buyerInfo.BookAt}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Choose Payment Method */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Choose Payment Method
              </Typography>
              <Box mt={4}>
                <CardActions>
                  <Button variant="contained" color="secondary" onClick={()=>GetMethod('MoMo')} sx={{ marginBottom: 2, width: '100%' }}>
                    Momo
                  </Button>
                </CardActions>
                <CardActions>
                  <Button variant="contained" color="secondary" onClick={()=>GetMethod('Paypal')} sx={{ marginBottom: 2, width: '100%' }}>
                   PayPal
                  </Button>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChoseMethodPayment;
