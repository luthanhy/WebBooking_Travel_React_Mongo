import React, { useState } from 'react';
import '../Booking/booking.css';
import { ListGroup, ListGroupItem, FormGroup, Button, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config.js';
import { useIsLoggedIn } from '../../utils/auth.js';

const Booking = ({ tour, AgvRating }) => {
  const userData = localStorage.getItem("user");
  let parsedUserData = null;
  if (userData) {
    try {
      parsedUserData = JSON.parse(userData);
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }

  const [credentials, setCredentials] = useState({
    userId: '01',
    userEmail: 'example@gmail.com',
    fullName: '',
    tourName: '',
    phoneNumber: '',
    guestSize: 1,
    BookAt: ''
  });

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  credentials.tourName = tour.title;

  if (useIsLoggedIn && parsedUserData) {
    credentials.userId = parsedUserData._id;
  }

  const ServiceFee = 10;
  const TotalAmount = Number(tour.price) * Number(credentials.guestSize) + ServiceFee;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials(prev => ({ ...prev, [id]: value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (Number(credentials.phoneNumber) <= 0 || Number(credentials.guestSize) <= 0) {
      alert("Phone number and guest size must be positive numbers.");
      return;
    }

    const bookAtDate = new Date(credentials.BookAt);

    if (bookAtDate < new Date(today) || bookAtDate > new Date(maxDateString)) {
      alert("The booking date must be within the next 3 months and within the current year.");
      return;
    }

    if (bookAtDate.getFullYear() !== new Date().getFullYear()) {
      alert("The booking date must be within the current year.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/booking/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (res.ok) {
        navigate("/choseMethodPayment", { state: { ...credentials, totalAmount: TotalAmount, tourName: tour.title } });
      } else {
        console.error("Error booking:", result);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className='booking'>
      <div className='booking_top d-flex align-items-center justify-content-between'>
        <h3>{tour.price}$/per person</h3>
        <span>
          {AgvRating === 0 ? null : AgvRating} {(tour && Array.isArray(tour.reviews) ? tour.reviews.length : 0)}
          <i className='ri-star-fill'></i>
        </span>
      </div>
      <h3 style={{ paddingTop: '1.5rem', paddingBottom: '1rem' }}>Information</h3>
      <div className='booking_form'>
        <Form className='booking_info_form' onSubmit={handleClick}>
          <div className='booking_info1'>
            <FormGroup>
              <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <input type="number" placeholder='Phone' id='phoneNumber' min="1" required onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <input type="text" placeholder='Email' id='userEmail' required onChange={handleChange} />
            </FormGroup>
          </div>
          <FormGroup>
            <input type="date" id='BookAt' min={today} max={maxDateString} required onChange={handleChange} />
            <input type="number" placeholder='Guest' id='guestSize' min="1" required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0 d">
            <h5 className='d-flex align-items-center gap-1'>${tour.price}<i className='ri-close-line'>1 person</i></h5>
            <span>${tour.price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${ServiceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="total_Y border-0 px-0">
            <h5>Total</h5>
            <span>${TotalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
}

export default Booking;
