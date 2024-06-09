import React, { useRef, useState, useEffect, useContext } from 'react';
import '../styles/tour_detail.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CalculateAvgRationg from '../utils/avgRating';
import Avatar_User from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const ToursDetails = () => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const { id } = useParams();
  const { data: DetailTour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const reviewMsgRef = useRef(null);
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (DetailTour && Array.isArray(DetailTour.reviews)) {
      console.log('Number of reviews:', DetailTour.reviews.length);
    } else {
      console.log('No reviews available or DetailTour is not loaded yet.');
    }
  }, [DetailTour]);

  const { avgRating, totalRating } = CalculateAvgRationg(DetailTour?.reviews || []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user || !user === undefined || user === null) {
      alert('Please sign in.');
      navigate("/login");
      return;
    }
    const reviewObj = {
      username: user?.username,
      reviewText,
      rating: tourRating,
    };
    try {
      const res = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (res.ok) {
        alert('Review submitted successfully!');
        // window.location.reload();  // Reload to fetch the new list of reviews
      } else {
        alert('Error submitting review: ' + result.message);
      }
    } catch (error) {
      alert('Error submitting review: ' + error.message);
    }
  };

  return (
    <>
      {loading && <h4>Loading...</h4>}
      {error && <h4>Error: {error}</h4>}
      {!loading && !error && DetailTour && (
        <section>
          <Container>
            <Row>
              <Col lg="8">
                <div className="tour_detail_content">
                  <img src={DetailTour.photo} alt={DetailTour.title} />
                  <div className="tour_info">
                    <h2>{DetailTour.title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span
                        className="star_info d-flex align-items-center gap-1"
                        style={{ color: "var(--secondary-color)" }}
                      >
                        <i className="ri-star-fill"></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0
                          ? "Not rated"
                          : ` (${DetailTour.reviews?.length || 0})`}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i> {DetailTour.address}
                      </span>
                    </div>
                    <div className="tour_extra_detail">
                      <span>
                        <i className="ri-map-pin-line"></i> {DetailTour.city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-fill"></i> {DetailTour.price}/per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {DetailTour.distance} km
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {DetailTour.maxGroupSize}
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{DetailTour.desc}</p>
                  </div>
                  <div className="review_tours mt-4">
                    <h4>Reviews ({DetailTour.reviews?.length || 0})</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="rating_group d-flex align-items-center gap-3 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setTourRating(star)}
                            className={tourRating === star ? 'selected' : ''}
                          >
                            {star}
                            <i className="ri-star-fill"></i>
                          </span>
                        ))}
                      </div>
                      <div className="review_input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          className=""
                          placeholder="Share your thoughts"
                          required
                        />
                        <button className="button_reviews btn primary__btn text-white">
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user_reviews">
                      {DetailTour.reviews?.map((review, index) => (
                        <div className="review_items" key={index}>
                          <img src={Avatar_User} alt="avatar" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="info_review">
                                <h5>{review.username}</h5>
                                <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                                <p>{review.reviewText}</p>
                              </div>
                              <span className="star_review d-flex align-content-end justify-content-end">
                                {review.rating} <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={DetailTour} AgvRating={avgRating} />
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default ToursDetails;
