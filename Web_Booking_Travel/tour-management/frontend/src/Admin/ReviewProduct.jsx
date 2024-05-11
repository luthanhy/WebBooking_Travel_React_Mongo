import React, { useState } from 'react';
import '../styles/productReview.css'; 

function ReviewProduct() {
    const [tours, setTours] = useState([
        { id: 1, name: 'Tour 1', description: 'Description of Tour 1' },
        { id: 2, name: 'Tour 2', description: 'Description of Tour 2' },
        { id: 3, name: 'Tour 3', description: 'Description of Tour 3' },
        { id: 4, name: 'Tour 4', description: 'Description of Tour 4' }
    ]);

    const acceptTour = (tourId) => {
        console.log(`Accept tour with ID ${tourId}`);
        const updatedTours = tours.map(tour => {
            if (tour.id === tourId) {
                return { ...tour, accepted: true };
            }
            return tour;
        });
        setTours(updatedTours);
    };

    const refuseTour = (tourId) => {
        console.log(`Refuse tour with ID ${tourId}`);
        const updatedTours = tours.map(tour => {
            if (tour.id === tourId) {
                return { ...tour, refused: true };
            }
            return tour;
        });
        setTours(updatedTours);
    };

    return (
        <div className='review-container'>
            <div className='review-tour-container'>
                {tours.map(tour => (
                    <div key={tour.id} className='review-tour-card'>
                        <h2>{tour.name}</h2>
                        <p>{tour.description}</p>
                        {!tour.accepted && !tour.refused && (
                            <div>
                                <button onClick={() => acceptTour(tour.id)} className="accept-btn">Accept</button>
                                <button onClick={() => refuseTour(tour.id)} className="refuse-btn">Refuse</button>
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
