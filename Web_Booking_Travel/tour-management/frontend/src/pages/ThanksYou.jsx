import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import { Container,Col,Row } from 'reactstrap'
import '../styles/thank-you.css'
import { useEffect,useState } from 'react';
const ThanksYou = () => {

    useEffect(() => {
      const userData = localStorage.getItem('user');
      let parsedUserData = null;
      if (userData) {
        try {
          parsedUserData = JSON.parse(userData);
          console.log("", parsedUserData);
        } catch (e) {
          console.error('Failed to parse user data:', e);
        }
      }
    }, []);
  
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