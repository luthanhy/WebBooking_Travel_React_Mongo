import React, { createContext, useState } from 'react';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  const updateReview = (updatedReview) => {
    setReviews(reviews.map(review => review.id === updatedReview.id ? updatedReview : review));
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, updateReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
