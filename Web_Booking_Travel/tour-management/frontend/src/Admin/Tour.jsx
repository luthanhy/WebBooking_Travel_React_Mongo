import React, { useState } from 'react';
import TourCard from '../AdminComponent/AdminFeatureTour/TourCard';
import "../styles/product.css";
const Tour = () => {
    const [tours, setProducts] = useState([
        // Your product data
    ]);
    const handleAddTour = (newTour) => {
        setProducts((prevProducts) => [...prevProducts, newTour]);
    };
    const handleDeleteProduct = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.filter((tour) => tour.id !== productId)
        );
    };

    const handleEditProduct = (productId) => {
        console.log('Edit product with id: ', productId);
    };

    return (
            <TourCard
                tour={tours}
                onAdd={handleAddTour}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
            />
    );
};

export default Tour;