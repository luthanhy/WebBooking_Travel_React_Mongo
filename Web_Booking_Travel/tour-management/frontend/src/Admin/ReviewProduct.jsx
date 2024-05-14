import React, { useState } from 'react';
import '../styles/productReview.css';

function ReviewProduct({ tourInfo }) {
    const [tours, setTours] = useState([
        { id: 1, name: 'Tour 1', location: 'Location of Tour 1', price: '1000' },
        { id: 2, name: 'Tour 2', location: 'Location of Tour 2', price: '1000' },
        { id: 3, name: 'Tour 3', location: 'Location of Tour 3', price: '1000' },
        { id: 4, name: 'Tour 4', location: 'Location of Tour 4', price: '1000' }
    ]);

    // Cập nhật state tours khi có dữ liệu được truyền từ Header
    const addNewTour = (newTour) => {
        const newTourWithId = { ...newTour, id: tours.length + 1 };
        setTours([...tours, newTourWithId]);
    };
    
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
                        <p>{tour.location}</p>
                        <p>{tour.price}</p>
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
