import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Box, Typography, Grid, Card, CardContent, CardActions } from '@mui/material';
import { getMoMoURL ,getPayPalURL } from '../hooks/hookPaymentURL';
import { BASE_URL } from '../utils/config';
let urlPMomo  = '';
let urlPayPal = '';
const ChoseMethodPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(null);
  const [tourName, setTourName] = useState(null);
    const [buyerInfo, setBuyerInfo] = useState({
      userId:'1',
      fullName: '',
      phoneNumber: '',
      tourName:'',
      userEmail: '',
      guestSize: '',
      BookAt: '',
      MeThodPayment: "",
      orderId: "",
      TimeBook :"",
    });
  const [credentials] = useState({
    id: "",
    payUrl: "",
    price:totalAmount
  });
  const [data] = useState({
    price:totalAmount,
    links:[]
  });
  async function fetchMoMoURL() {
    credentials.price =  location.state.totalAmount;
    data.price = location.state.totalAmount;
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
    if (location.state) {
      setTotalAmount(location.state.totalAmount);
      setTourName(location.state.tourName);
      setBuyerInfo({
        userId:location.state.userId,
        tourName:location.state.tourName,
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
  useEffect(() => {
    return () => {
      fetchMoMoURL();
    };
  });
  const GetMethod = (methodType) => {
    if(methodType === 'MoMo') {
      buyerInfo.MeThodPayment = "MoMo";
      console.log( credentials.partnerCode)
      buyerInfo.orderId = credentials.requestId;
      buyerInfo.TimeBook = new Date();
      try{
        console.log(" ",buyerInfo);
        const req = fetch(`${BASE_URL}/booking`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(buyerInfo)  
        })
        if(req.ok){
          console.log("create",req.text);
        }
        console.log("data fai")
      }catch(eer){
        console.log("",eer);
      }
      window.location.href = urlPMomo;
    }else if(methodType === 'Paypal'){
      buyerInfo.MeThodPayment = "PayPal";
      buyerInfo.orderId = data.id;
      buyerInfo.TimeBook = new Date();
      try{
        const res = fetch(`${BASE_URL}/booking`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(buyerInfo)  
        })
        if(res.ok){
          console.log("create");
        }
        console.log("data fai")
      }catch(eer){}
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
