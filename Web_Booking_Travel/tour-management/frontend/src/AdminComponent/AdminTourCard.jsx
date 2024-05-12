import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import CalculateAvgRating from '../utils/avgRating';
import "../styles/product.css"

const AdminTourCard = ({ tour, handleAdd, handleEdit, handleDelete }) => {
    const { id, title, city, photo, price, featured, reviews } = tour;
    const { totalRating, avgRating } = CalculateAvgRating(reviews);

    return (
        <div className='product-container'>
          <div className='tour-card-container'>
            {/* Render các tour cards ở đây */}
               <div className='tour-card'>
                        <Card>
                            <div className='tour_img'>
                                <img src={photo} alt='' />
                                {featured && <span>Featured</span>}
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
                                    {totalRating === 0 ? (
                                        'Not rated'
                                    ) : (
                                        <span>{reviews.length}</span>
                                    )}
                                </span>
                            </div>
                            <h5 className='tour__title'>
                                <Link to={`/tours/${id}`}>{title}</Link>
                            </h5>
                            <div className='card__button d-flex align-items-center justify-content-between mt-3'>
                                <h5>
                                    ${price}
                                    <span>/per person</span>
                                </h5>
                            </div>
                            <div className='product-actions'>
                                <button className='add-button' onClick={() => handleAdd(tour)}>
                                    Add
                                </button>
                                <button className='edit-button' onClick={() => handleEdit(tour)}>
                                    Edit
                                </button>
                                <button className='delete-button' onClick={() => handleDelete(id)}>
                                    Delete
                                </button>
                            </div>
                        </CardBody>
                    </div>
                </div>

            </div>

        


    );
};

export default AdminTourCard;