import React from 'react'
import '../styles/tour_detail.css'
import { Container,Row,Col,Form,FormGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import TourData from '../assets/data/tours'
import CalculateAvgRationg from '../utils/avgRating'
const ToursDetails = () => {
  const {id} = useParams()

  const tour  = TourData.find(tour => tour.id === id)

  const {photo,title,address,desc,price,reviews,city,distance,maxGroupSize} = tour
 
  const {avgRating,totalRating} = CalculateAvgRationg(reviews)
  return (
    <>
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <div className='tour_detail_content'>
              <img src={photo} alt="" />
            </div>
            <div className='tour_info'>
              <h2>{title}</h2>
              <div className=' d-flex align-items-center gap-5'> <span className='tour__rating d-flex align-items-center gap-1' style={{color:"var(--secondary-color)"}}>
                    <i className=' ri-star-fill'></i>{avgRating === 0 ? null : avgRating}{totalRating === 0 ?("Not rated"):(<span>({reviews.length})</span>)}
              </span>
              <span>
                <i className='ri-map-pin-user-fill'>{address}</i>
              </span></div>
             
            <div className='tour_extra_detail'>
              <span><i className='ri-map-pin-line'>{city}</i></span>
              <span><i className='ri-money-dollar-circle-fill'>{price}</i></span>
              <span><i className=' ri-group-line'>{maxGroupSize}</i></span>
            </div>
            <h5>Description</h5>
            <p>{desc}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default ToursDetails