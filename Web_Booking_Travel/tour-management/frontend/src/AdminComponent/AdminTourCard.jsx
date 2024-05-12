import React from 'react'
import "../shared/TourCard.css"
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import CalculateAvgRating from '../utils/avgRating'

const AdminTourCard = ({ tour, handleAdd, handleEdit, handleDelete }) => {
  const { id, title, city, photo, price, featured, reviews } = tour

  const { totalRating, avgRating } = CalculateAvgRating(reviews)

  return (
    <div className='tour_card'>
      <Card>
        <div className='tour_img'>
          <img src={photo} alt='' />
          <span>Feature</span>
        </div>
      </Card>
      <CardBody>
        <div className='card__top d-flex align-items-center justify-content-between'>
          <span className='tour__location d-flex align-items-center gap-1'>
            <i className='ri-map-line'></i>{city}
          </span>
          <span className='tour__rating d-flex align-items-center gap-1'>
            <i className=' ri-star-fill'></i>
            {avgRating === 0 ? null : avgRating}
            {totalRating === 0 ? "Not rated" : <span>{reviews.length}</span>}
          </span>
        </div>
        <h5 className='tour__title'>
          <Link to={`/tours/${id}`}>{title}</Link>
        </h5>
        <div className='card__button d-flex align-items-center justify-content-between mt-3'>
          <h5>
            ${price}<span>/per person</span>
          </h5>
        </div>
        <div>
          <button className=' btn btn_booking' onClick={handleAdd}>Add</button>
          <button className=' btn btn_booking' onClick={() => handleEdit(tour.id)}>Edit</button>
          <button className=' btn btn_booking' onClick={() => handleDelete(tour.id)}>Delete</button>
        </div>
      </CardBody>
    </div>
  )
}

export default AdminTourCard