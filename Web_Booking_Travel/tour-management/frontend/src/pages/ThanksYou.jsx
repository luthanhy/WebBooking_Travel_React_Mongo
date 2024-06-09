import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import '../styles/thank-you.css';
import { BASE_URL, URL_DOMAIN } from '../utils/config';

const ThankYou = () => {
    const location = useLocation();
    const [token, setToken] = useState("");
    const [paymentInfo, setPaymentInfo] = useState({
        MeThodPayment: "",
        orderId: "",
        idBooking: ""
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                fetchNotifications(parsedUserData._id);
            } catch (e) {
                console.error('Failed to parse user data:', e);
            }
            const searchParams = new URLSearchParams(location.search);
            const tokenParam = searchParams.get('token');
            if (tokenParam) setToken(tokenParam);
        }
    }, [location.search]);

    const fetchNotifications = async (userId) => {
        try {
            const res = await fetch(`${BASE_URL}/booking/notifications/${userId}`);
            const result = await res.json();
            if (res.ok) {
                const { MeThodPayment, orderId, _id } = result.data[0];
                setPaymentInfo({ MeThodPayment, orderId, idBooking: _id });
            } else {
                console.error('Error fetching notifications:', result.message);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const CheckPayMent = async (MeThodPayment, orderId, idBooking) => {
        try {
            if (MeThodPayment === 'MoMo') {
                const res = await fetch(`${URL_DOMAIN}/InitiateTransaction`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ orderId })
                });
                const result = await res.json();
                if (result.data.message === 'Successful.') {
                    await updateBookingStatus(idBooking);
                }
            } else if (MeThodPayment === 'PayPal' && token) {
                const res = await fetch(`${URL_DOMAIN}/completePayment?token=${token}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const result = await res.json();
                if (result.data.status === "COMPLETED") {
                    await updateBookingStatus(idBooking);
                }
            }
        } catch (error) {
            console.error("Error in payment check:", error);
        }
    };

    const updateBookingStatus = async (idBooking) => {
        try {
            const res = await fetch(`${BASE_URL}/booking/${idBooking}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Status_Transaction: 'true' })
            });
            const result = await res.json();
            if (res.ok) {
                console.log("Booking status updated:", result.data);
                sendBookingEmail(result.data);
            } else {
                console.error('Error updating booking status:', result.message);
            }
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const sendBookingEmail = async (bookingInfo) => {
      try {
          const res = await fetch(`${URL_DOMAIN}/sendBookingMail`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ 
                  recipient: bookingInfo.userEmail, 
                  bookingInfo 
              })
          });
          const result = await res.json();
          if (res.ok) {
              console.log(result.message);
          } else {
              console.error('Failed to send email:', result.message);
          }
      } catch (error) {
          console.error('Error sending booking email:', error);
      }
  };

    useEffect(() => {
        if (paymentInfo) {
            CheckPayMent(paymentInfo.MeThodPayment, paymentInfo.orderId, paymentInfo.idBooking);
        }
    }, [paymentInfo]);

    return (
        <Container>
            <Row>
                <Col lg='12'>
                    <div className='thankyou_content pt-5 text-center'>
                        <span> <i className=' ri-checkbox-circle-line'></i></span>
                        <h1 className=' m-3 fw-semibold'>Thank You</h1>
                        <h3 className=' mb-4'>Your tour is booked</h3>
                        <button className='btn primary__btn w-25'><Link to="/home">Back To Home</Link></button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ThankYou;
