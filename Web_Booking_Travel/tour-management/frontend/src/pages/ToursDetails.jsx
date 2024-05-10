import React ,{useRef,useEffect, useState} from 'react'
import '../styles/tour_detail.css'
import { Container,Row,Col,Form,FormGroup, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import TourData from '../assets/data/tours'
import CalculateAvgRationg from '../utils/avgRating'
import Avatar_User from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
const ToursDetails = () => {
  //format date time
  const options = {day:'numeric',month:'long',year:'numeric'}

  const {id} = useParams()

  const tour  = TourData.find(tour => tour.id === id)

  const {photo,title,address,desc,price,reviews,city,distance,maxGroupSize} = tour
  
  const {avgRating,totalRating} = CalculateAvgRationg(reviews)

  const reviewMsgRef = useRef(null)
  const [tourRating,StateTourRating] = useState(null)

  const submitHandler = e =>{
     e.preventDefault();
    const reviewText = reviewMsgRef.current.value
    
    alert(`${reviewText},${tourRating}`)
  }
  return (
    <>
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <div className='tour_detail_content'>
              <img src={photo} alt="" />

            <div className='tour_info'>
              <h2>{title}</h2>
              <div className=' d-flex align-items-center gap-5'> <span className='star_info d-flex align-items-center gap-1' style={{color:"var(--secondary-color)"}}>
                    <i className=' ri-star-fill'>
                      </i>{avgRating === 0 ? null : avgRating}{totalRating === 0 ?("Not rated"):(<span>({reviews.length})</span>)}
              </span>
              <span>
                <i className='ri-map-pin-user-fill'>{address}</i>
              </span></div>
            <div className='tour_extra_detail'>
              <span><i className='ri-map-pin-line'>{city}</i></span>
              <span><i className='ri-money-dollar-circle-fill'>{price}/per person</i></span>
              <span><i className=' ri-map-pin-time-line'>{distance} k/m</i></span>
              <span><i className=' ri-group-line'>{maxGroupSize}</i></span>
            </div>
            <h5>Description</h5>
            <p>{desc}</p>
            </div>
              {/* review feature */}
              <div className='review_tours mt-4'>
                  <h4>Reviews ({reviews.length}) reviews</h4>
                  <Form onSubmit={submitHandler}>
                    <div className=' rating_group d-flex align-items-center gap-3 mb-4'>
                        <span onClick={()=>StateTourRating(1)}>1<i className=" ri-star-fill"></i></span>
                        <span onClick={()=>StateTourRating(2)}>2<i className=" ri-star-fill"></i></span>
                        <span onClick={()=>StateTourRating(3)}>3<i className=" ri-star-fill"></i></span>
                        <span onClick={()=>StateTourRating(4)}>4<i className=" ri-star-fill"></i></span>
                        <span onClick={()=>StateTourRating(5)}>5<i className=" ri-star-fill"></i></span>
                    </div>
                    <div className='review_input'> 
                      <input type="text" ref={reviewMsgRef} className="" placeholder='share your thoughts'/>
                     <button className=' button_reviews btn primary__btn text-white'>
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className='user_reviews'>
                        {
                          reviews?.map(reviews=>(
                              <div className='review_items'>
                                <img src={Avatar_User} alt="" />
                                <div className='w-100'>
                                    <div className=' d-flex align-items-center justify-content-between '>
                                      <div className='info_review'>
                                        <h5>Product Reviews</h5>
                                        <p>
                                          {new Date('05-08-2024').toLocaleDateString('en-US',options)}
                                        </p>
                                        <h6> review user</h6>
                                      </div>
                                      <span className='star_review d-flex align-content-end justify-content-end'>
                                      5 <i className=' ri-star-s-fill'></i>
                                    </span>
                                    </div>
                                </div>
                              </div>
                          ))
                        }
                  </ListGroup>
              </div>
            </div>
          </Col>
          <Col lg='4'>
            <Booking tour={tour} AgvRating={avgRating}></Booking>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default ToursDetails