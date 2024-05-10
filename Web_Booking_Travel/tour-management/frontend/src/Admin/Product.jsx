import React, { useState } from 'react';
import { BsFillTagFill, BsFillCameraFill, BsFillEyeFill } from 'react-icons/bs';
import '../styles/product.css'; // Assuming CSS file is named Product.css

const ProductCard = ({ product, onDelete, onEdit }) => {
    const handleDelete = () => {
        onDelete(product.id);
    };

    const handleEdit = () => {
        onEdit(product.id);
    };

    return (
        <div className="product-card" key={product.id}>
            <div className="product-image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                    <div className="product-detail">
                        <BsFillTagFill className="product-detail-icon" />
                        <span className="product-detail-text">{product.category}</span>
                    </div>
                    <div className="product-detail">
                        <BsFillCameraFill className="product-detail-icon" />
                        <span className="product-detail-text">{product.duration} days</span>
                    </div>
                    <div className="product-detail">
                        <BsFillEyeFill className="product-detail-icon" />
                        <span className="product-detail-text">{product.price} VND</span>
                    </div>
                </div>
            </div>
            <div className="product-actions">
                <button className="edit-button" onClick={handleEdit}>
                    Edit
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

const ProductList = ({ products, onDelete, onEdit }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard product={product} key={product.id} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
};

const Product = () => {
    const [products, setProducts] = useState([
    {
        id: 1,
        title: 'Tour du lịch Đà Lạt 3 ngày 2 đêm',
        description: 'Khám phá thành phố mộng mơ Đà Lạt với tour du lịch 3 ngày 2 đêm.',
        image: 'https://unsplash.com/s/photos/dalat',
        category: 'Du lịch trong nước',
        duration: 3,
        price: 2500000,
    },
    {
        id: 2,
        title: 'Tour du lịch Phú Quốc 5 ngày 4 đêm',
        description: 'Tận hưởng kỳ nghỉ biển tuyệt vời tại Phú Quốc với tour du lịch 5 ngày 4 đêm.',
        image: 'https://unsplash.com/s/photos/phu-quoc',
        category: 'Du lịch biển',
        duration: 5,
        price: 4200000,
    },
    ]);

        const handleDeleteProduct = (productId) => {
        setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
    );
    };

        const handleEditProduct = (productId) => {
        console.log("Edit product with id: ", productId);
    };

    return (
        <div className="product-container">
        <h2 className="product-heading">Product Management</h2>
        <ProductList products={products} onDelete={handleDeleteProduct} onEdit={handleEditProduct} />
        </div>
    );
};

export default Product;