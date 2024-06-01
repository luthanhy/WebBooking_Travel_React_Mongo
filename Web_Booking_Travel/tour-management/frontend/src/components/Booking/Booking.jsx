import React, { useState } from 'react'
import '../Booking/booking.css'
import { ListGroup, ListGroupItem,FormGroup,Button,Form} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/config.js'
import { useIsLoggedIn, useIsAdmin } from '../../utils/auth.js';

const Booking = ({tour,AgvRating}) => {

    
    const userData = localStorage.getItem("user");
    const parsedUserData = userData ? JSON.parse(userData) : null;
    
  const [credentials,setCredentials] = useState({
    userId:'01',
    userEmail:'example@gmail.com',
    fullName:'',
    tourName:'',
    phoneNumber:'',
    guestSize:1,
    BookAt:''
  })
  const [error, setError] = useState('');
  console.log("",tour.title)
  credentials.tourName = tour.title;
  console.log("yluthanh",useIsLoggedIn) 
  if(useIsLoggedIn){
        console.log("luthanhy",parsedUserData)
    }
  const ServiceFee = 10;
  const TotalAmount = Number(tour.price) * Number(credentials.guestSize) + ServiceFee;
  const handleChange = async(e) =>{
    setCredentials(prev=> ({...prev,[e.target.id]:e.target.value}))
    setError('');
  
  }
  const navigate = useNavigate();
  const handleClick = async(e) =>{
    e.preventDefault();
    setError('')
    try {
        console.log(`${BASE_URL}/booking/`);
        const res = await fetch(`${BASE_URL}/booking/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const result = await res.json();
        console.log("Response JSON:", result);
        console.log("Data:", result.data);
        console.log(credentials)
        if(!res.ok){
          setError("book failed")
        }else{
          navigate("/thank-you")
        }
    } catch (error) {
      setError("luthanhy");
        console.error("Error occurred:", error);
    }
    }
  return (
    <>
        <div className='booking'>
            <div className='booking_top d-flex align-items-center justify-content-between'> 
                <h3>{tour.price}$/per person</h3>
                <span >
                    {AgvRating===0 ? null:AgvRating} {(tour&&Array.isArray(tour.reviews) ? tour.reviews.length : 0)}
                    <i className=' ri-star-fill'></i>
                </span>
            </div>
            <h3 style={{paddingTop:'1.5rem',paddingBottom:'1rem'}}>Information</h3>
            {error && <div className="alert alert-danger">{error}</div>}
        <div className='booking_form'>
            <Form className = 'booking_info_form' onSubmit={handleClick}>
                <div className='booking_info1'>
                <FormGroup>
                      <input
                        type="text"
                        placeholder="Email"
                        required
                        id="fullName"
                        value={credentials.fullName}
                        onChange={handleChange}
                      />
                    </FormGroup>
                <FormGroup >

                    <input type="text" placeholder='Full Name' required id='fullName' value={credentials.fullName} onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                    <input type="number" placeholder='Phone' id='phoneNumber'required value={credentials.phoneNumber} onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                    <input type="text" placeholder='Email' id='userEmail' required value={credentials.userEmail} onChange={handleChange}/>
                </FormGroup>
                </div>
                <div>
                <FormGroup>
                    <input type="date" placeholder='' id='BookAt' required value={credentials.BookAt} onChange={handleChange}/>
                    <input type="number" placeholder='Guest' id='guestSize' required value={credentials.guestSize} onChange={handleChange}/>
                </FormGroup>
                </div>
                <div className="booking_bottom">
                  <ListGroup>
                      <ListGroupItem className=" border-0 px-0 d"><h5 className=' d-flex align-items-center gap-1'>${tour.price}<i className=' ri-close-line'>1 person</i></h5> <span>${tour.price}</span></ListGroupItem>
                      <ListGroupItem className=" border-0 px-0"><h5>Service Charge </h5> <span>${ServiceFee}</span></ListGroupItem>
                      <ListGroupItem className="total_Y border-0 px-0"><h5>Total</h5> <span>${TotalAmount}</span></ListGroupItem>
                  </ListGroup>
                </div>
            <Button className=' btn primary__btn w-100 mt-4' type = 'submit'>Book Now</Button>
            </Form>

        </div>
    </div>
    </>
  )
}
export default Booking
