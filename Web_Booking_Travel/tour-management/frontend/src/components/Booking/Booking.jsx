import React from 'react'
import '../Booking/booking.css'
import { ListGroup,ListGroupItem,FormGroup,Button,Form, Input} from 'reactstrap'

const Booking = ({tour,AgvRating}) => {
  const {price,reviews} = tour
  const handleChange = e =>{

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
            <h3>Information</h3>
        <div className='booking_form'>
            <Form className = 'booking_info_form'>
                <FormGroup >
                    <input type="text" placeholder='Full Name' id='full_name'required onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                    <input type="number" placeholder='Phone' id='phone'required onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                    <input type="text" placeholder='Full Na me' id='book_at' required onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <input type="date" placeholder='' id='bookAt' required onChange={handleChange}/>
                    <input type="number" placeholder='' id='getSize' required onChange={handleChange}/>
                </FormGroup>
            </Form>
        </div>
        </div>
    </>
)
}

export default Booking