import React ,{useState} from 'react';
import AdminTourCard from '../AdminTourCard.jsx';
import TourData from '../../assets/data/tours.js';
import { Col } from 'reactstrap';
import Modal from 'react-modal';
 import '../../styles/product.css';

const TourCard = ({ product, onAdd,onDelete, onEdit }) => {
    
    const handleAdd =()=>{
        onAdd(product.id);
    }
    const handleDelete = () => {
        onDelete(product.id);
    };

    const handleEdit = () => {
        onEdit(product.id);
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="product_card">
            {TourData?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour.id}>
                    <AdminTourCard
                        tour={tour}
                        handleAdd={handleAdd}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </Col>
            ))}
        </div>
    );
};

export default TourCard;