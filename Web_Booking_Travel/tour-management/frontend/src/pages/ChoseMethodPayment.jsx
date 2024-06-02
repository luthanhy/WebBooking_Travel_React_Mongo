import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Grid, Paper, makeStyles } from '@mui/material';
import { Col, Row } from 'reactstrap';
import { URL_DOMAIN } from '../utils/config';
import '../styles/chosePayment.css';

const ChoseMethodPayment = () => {
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Details:', paymentDetails);
    alert('Payment Successful!');
  };
  const GetMethod = async (res) => {
    try {
       res = await fetch(`${URL_DOMAIN}/paymentmmo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
      });
      if (!res.ok) {
        console.log("error");
      } else {
        const result = await res.json();
        window.location.href = result.data.payUrl;
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  if (!totalAmount || !tourName) {
    return null;
  }

  return (
    
    <Container maxWidth="lg" className="chose-method-payment-container">
      <Grid container spacing={4}>
        {/* Left Side: Booking Information */}
        <Grid item xs={12} md={6} className="custom-padding-top">
          <Paper elevation={3} className="chose-method-payment-paper">
            <Typography variant="h4" gutterBottom>
              Booking Information
            </Typography>
            <Typography variant="h6" gutterBottom>
              Total Amount: ${totalAmount}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Tour: {tourName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Full Name: {buyerInfo.fullName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Phone Number: {buyerInfo.phoneNumber}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email: {buyerInfo.userEmail}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Guest Size: {buyerInfo.guestSize}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Book At: {buyerInfo.BookAt}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Side: Choose Payment Method */}
        <Grid item xs={12} md={6} className="custom-padding-top">
          <Paper elevation={3} className="chose-method-payment-paper">
            <Typography variant="h4" gutterBottom>
              Choose Payment Method
            </Typography>
           
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                Alternative Payment Methods
              </Typography>
              <Row>
                <Col lg='12' className='d-flex align-items-center'>
                <Button variant="contained" color="secondary" onClick={GetMethod}>
                   Momo
                  </Button>
                </Col>
              </Row>
              
                <Col lg='12' className='d-flex align-items-center'>
                  <Button variant="contained" color="secondary" onClick={GetMethod}>
                    <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>PayPal</Link>
                  </Button>
                </Col>
              
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChoseMethodPayment;
