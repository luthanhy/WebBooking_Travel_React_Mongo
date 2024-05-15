import React, { useState } from 'react'
import '../Booking/booking.css'
import { ListGroup,ListGroupItem,FormGroup,Button,Form, Input} from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const Booking = ({tour,AgvRating}) => {
  const {price,reviews} = tour
  const [credentials,setCredentials] = useState({
    userId:'01',
    userEmail:'example@gmail.com',
    fullName:'',
    phone:'',
    getSize:1,
    bookAt:''
  })
  const ServiceFee = 10;
  const TotalAmount = Number(price) * Number(credentials.getSize) + ServiceFee;
  const handleChange = e =>{
    setCredentials(prev=> ({...prev,[e.target.id]:e.target.value}))
  }
  const navigate = useNavigate();
  const handleClick = e =>{
    e.preventDefault();
    console.log(credentials)
    navigate("/thank-you")
    }
  return (
    <>
        <div className='booking'>
            <div className='booking_top d-flex align-items-center justify-content-between'> 
                <h3>{price}$/per person</h3>
                <span >
                    {AgvRating===0 ? null:AgvRating} {(reviews.length)}
                    <i className=' ri-star-fill'></i>
                </span>
            </div>
            <h3 style={{paddingTop:'1.5rem',paddingBottom:'1rem'}}>Information</h3>
        <div className='booking_form'>
            <Form className = 'booking_info_form' onSubmit={handleClick}>
                <div className='booking_info1'>
                <FormGroup >
                    <input type="text" placeholder='Full Name' id='full_name'required onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                    <input type="number" placeholder='Phone' id='phone'required onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                    <input type="text" placeholder='Full Na me' id='book_at' required onChange={handleChange}/>
                </FormGroup>
                </div>
                <FormGroup>
                    <input type="date" placeholder='' id='bookAt' required onChange={handleChange}/>
                    <input type="number" placeholder='Guest' id='getSize' required onChange={handleChange}/>
                </FormGroup>
            </Form>
        </div>
        <div className="booking_bottom">
            <ListGroup>
                <ListGroupItem className=" border-0 px-0 d"><h5 className=' d-flex align-items-center gap-1'>${price}<i className=' ri-close-line'>1 person</i></h5> <span>${price}</span></ListGroupItem>
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