import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import { Container,Col,Row } from 'reactstrap'
import '../styles/thank-you.css'
import { useEffect,useState } from 'react';
import { BASE_URL } from '../utils/config';
const ThanksYou = () => {
    const [getPaymentInfo, setPaymentInfo] = useState({
        MeThodPayment:"",
        orderId:""

    })
    useEffect(() => {
        
      const userData = localStorage.getItem('user');
      let parsedUserData = null;
      if (userData) {
        try {
          parsedUserData = JSON.parse(userData);
          console.log("", parsedUserData._id);
          fetchNotifications(parsedUserData._id);
        //   notifications
        } catch (e) {
          console.error('Failed to parse user data:', e);
        }
      }
    }, []);
  
    
  const fetchNotifications = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/notifications/${userId}`);
      const result = await res.json();
      if (res.ok) {
        console.log("", result.data);
        setPaymentInfo.MeThodPayment = result.data.MeThodPayment;
        setPaymentInfo.orderId = result.data.orderId;
      } else {
        console.error('Error fetching notifications:', result.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  console.log("All Method",getPaymentInfo);
  return (
    <>
    <Container>
        <Row>
            <Col lg='12'>
                <div className='thankyou_content pt-5 text-center'>
                    <span> <i className=' ri-checkbox-circle-line'></i></span>
                    <h1 className=' m-3 fw-semibold'>ThankYou</h1>
                    <h3 className=' mb-4'>Your tour is booked</h3>
                    <button className='btn primary__btn w-25'><Link to="/home">Back To Home</Link></button>
                </div>
            </Col>
        </Row>
    </Container>
    </>
)
}

export default ThanksYou