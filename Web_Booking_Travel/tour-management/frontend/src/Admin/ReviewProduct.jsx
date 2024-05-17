import React, { useContext } from 'react';
import '../styles/productReview.css';
import { ReviewContext } from '../context/ReviewContext';

function ReviewProduct() {
  const { reviews, updateReview } = useContext(ReviewContext);

  const handleAccept = (id) => {
    const updatedReview = reviews.find(review => review.id === id);
    updatedReview.accepted = true;
    updatedReview.refused = false;
    updateReview(updatedReview);
  };

  const handleRefuse = (id) => {
    const updatedReview = reviews.find(review => review.id === id);
    updatedReview.accepted = false;
    updatedReview.refused = true;
    updateReview(updatedReview);
  };

  return (
    <div className='review-container'>
      <div className='review-tour-container'>
        {reviews.map(tour => (
          <div key={tour.id} className='review-tour-card'>
            <h2>{tour.name}</h2>
            <p>{tour.location}</p>
            <p>{tour.price}</p>
            {!tour.accepted && !tour.refused && (
              <div>
                <button className="accept-btn" onClick={() => handleAccept(tour.id)}>Accept</button>
                <button className="refuse-btn" onClick={() => handleRefuse(tour.id)}>Refuse</button>
              </div>
            )}
            {tour.accepted && <p>Tour accepted</p>}
            {tour.refused && <p>Tour refused</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewProduct;
