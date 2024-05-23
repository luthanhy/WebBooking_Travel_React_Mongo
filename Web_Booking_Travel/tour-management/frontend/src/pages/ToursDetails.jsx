import React ,{useRef,useEffect, useState, useContext} from 'react'
import '../styles/tour_detail.css'
import { Container,Row,Col,Form,FormGroup, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import TourData from '../assets/data/tours'
import CalculateAvgRationg from '../utils/avgRating'
import Avatar_User from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import useFetch from '../hooks/useFetch'
import {AuthContext} from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
const ToursDetails = () => {
  //format date time
  const options = {day:'numeric',month:'long',year:'numeric'}
  const {id} = useParams()
  console.log("",id)
  //http://localhost:4000/api/v1/tours/6640c7f8e607938c4968c73d
  const {data:DetailTour,loading,error} =  useFetch(`${BASE_URL}/tours/${id}`)
  console.log(`${BASE_URL}/tours/${id}`);
  const {user} = useContext(AuthContext);
// Check and log reviews count
if (DetailTour && Array.isArray(DetailTour.reviews)) {
  console.log('Number of reviews:', DetailTour.reviews.length);
} else {
  console.log('No reviews available or DetailTour is not loaded yet.');
}

  console.log(DetailTour.reviews)
  // const tour  = TourData.find(tour => tour.id === id)
  // const {photo,title,address,desc,price,reviews,city,distance,maxGroupSize} = tour
  
  const {avgRating,totalRating} = CalculateAvgRationg(DetailTour.reviews)

  const reviewMsgRef = useRef(null)
  const [tourRating,StateTourRating] = useState(null)

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
        if (!user || user === undefined || user === null) {
            alert("Please login to submit review");
            return;
        }

        const reviewObj = {
            username: user?.username,
            reviewText,
            rating: tourRating,
        };

        const res = await fetch(`${BASE_URL}/reviews/${id}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                //'Authorization': `Bearer ${user.token}` // Nếu bạn sử dụng JWT
            },
           // credentials: 'include',
            body: JSON.stringify(reviewObj)
        });

        const result = await res.json();
        if (!res.ok) {
            alert(result.message);
            return;
        }

        alert(result.message);
    } catch (err) {
        alert(err.message);
    }
};
  return (
    <>
    {
      loading && <h4> Loading</h4>
    }{
      error && <h4> error</h4>
    }{
      !loading && !error &&
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <div className='tour_detail_content'>
              <img src={DetailTour.photo} alt="" />

            <div className='tour_info'>
              <h2>{DetailTour.title}</h2>
              <div className=' d-flex align-items-center gap-5'> <span className='star_info d-flex align-items-center gap-1' style={{color:"var(--secondary-color)"}}>
                    <i className=' ri-star-fill'>
                      </i>{avgRating === 0 ? null : avgRating}{totalRating === 0 ?("Not rated"):(<span>({DetailTour && Array.isArray(DetailTour.reviews) ? DetailTour.reviews.length : 0 })</span>)}
              </span>
              <span>
                <i className='ri-map-pin-user-fill'>{DetailTour.address}</i>
              </span></div>
            <div className='tour_extra_detail'>
              <span><i className='ri-map-pin-line'>{DetailTour.city}</i></span>
              <span><i className='ri-money-dollar-circle-fill'>{DetailTour.price}/per person</i></span>
              <span><i className=' ri-map-pin-time-line'>{DetailTour.distance} k/m</i></span>
              <span><i className=' ri-group-line'>{DetailTour.maxGroupSize}</i></span>
            </div>
            <h5>Description</h5>
            <p>{DetailTour.desc}</p>
            </div>
              {/* review feature */}
              <div className='review_tours mt-4'>
                  <h4>Reviews ({DetailTour && Array.isArray(DetailTour.reviews) ? DetailTour.reviews.length : 0 }) reviews</h4>
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
                          DetailTour.reviews?.map(reviews=>(
                              <div className='review_items'>
                                <img src={Avatar_User} alt="" />
                                <div className='w-100'>
                                    <div className=' d-flex align-items-center justify-content-between '>
                                      <div className='info_review'>
                                        <h5> {reviews.username}</h5>
                                        <p>
                                          {new Date('05-08-2024').toLocaleDateString('en-US',options)}
                                        </p>
                                      
                                      </div>
                                      <span className='star_review d-flex align-content-end justify-content-end'>
                                        {reviews.rating}
                                       <i className=' ri-star-s-fill'></i>
                                    </span>
                                    </div>
                                    <h6>{reviews.reviewText}</h6>
                                </div>
                              </div>
                          ))
                        }
                  </ListGroup>
              </div>
            </div>
          </Col>
          <Col lg='4'>
            <Booking tour={DetailTour} AgvRating={avgRating}></Booking>
          </Col>
        </Row>
      </Container>
    </section>
    }
    </>
  )
}

export default ToursDetails