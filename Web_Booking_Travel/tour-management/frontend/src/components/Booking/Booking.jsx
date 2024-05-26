import React, { useState } from 'react'
import '../Booking/booking.css'
import { ListGroup,ListGroupItem,FormGroup,Button,Form} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/config.js'
import { useIsLoggedIn, useIsAdmin } from '../../utils/auth.js';
const Booking = ({tour,AgvRating}) => {

    // const {data:DataBooking ,error ,}

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
  console.log("",tour.title)
  credentials.tourName = tour.title;
   if(useIsLoggedIn){
        console.log("",parsedUserData)
        credentials.userId = parsedUserData._id;
    }
   
//   credentials.userId = ;
  const ServiceFee = 10;
  const TotalAmount = Number(tour.price) * Number(credentials.guestSize) + ServiceFee;
  const handleChange = async(e) =>{
    setCredentials(prev=> ({...prev,[e.target.id]:e.target.value}))
  
  
  }
  const navigate = useNavigate();
  const handleClick = async(e) =>{
    e.preventDefault();
    console.log("luthanhy" ,credentials);
    try {
        console.log(`${BASE_URL}/booking/`)
        const res = await fetch( `${BASE_URL}/booking/`,{
            method: "POST",
            headers: {
                'Content-Type': 'applation/json',
            },
            body: JSON.stringify(credentials),
        });
        const result = res.json();
        console.log("luthanhy7",result.data);
    } catch (error) {
        
    }
    console.log(credentials)
    navigate("/thank-you")
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
        <div className='booking_form'>
            <Form className = 'booking_info_form' onSubmit={handleClick}>
                <div className='booking_info1'>
                <FormGroup >
                    <input type="text" placeholder='Full Name' id='fullName'required onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                    <input type="number" placeholder='Phone' id='phoneNumber'required onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                    <input type="text" placeholder='Email' id='userEmail' required onChange={handleChange}/>
                </FormGroup>
                </div>
                <FormGroup>
                    <input type="date" placeholder='' id='BookAt' required onChange={handleChange}/>
                    <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange}/>
                </FormGroup>
            </Form>
        </div>
        <div className="booking_bottom">
            <ListGroup>
                <ListGroupItem className=" border-0 px-0 d"><h5 className=' d-flex align-items-center gap-1'>${tour.price}<i className=' ri-close-line'>1 person</i></h5> <span>${tour.price}</span></ListGroupItem>
                <ListGroupItem className=" border-0 px-0"><h5>Service Charge </h5> <span>${ServiceFee}</span></ListGroupItem>
                <ListGroupItem className="total_Y border-0 px-0"><h5>Total</h5> <span>${TotalAmount}</span></ListGroupItem>
            </ListGroup>
            <Button className=' btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
        </div>
        </div>
    </>
)
}

export default Booking