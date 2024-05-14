import React, { useState } from 'react'
import TourData from '../assets/data/tours'
import { Col, Button, Input } from 'reactstrap'
import AdminTourCard from './AdminTourCard'
import '../styles/tourAdmin.css';
import AddTour from './AddTour';

const ADTour = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTours, setFilteredTours] = useState(TourData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleAdd = () => {
    toggleModal();
  };

  const handleEdit = (tourId) => {
    // Xử lý khi nhấn nút Edit
    console.log(`Edit Tour with id: ${tourId}`);
  };

  const handleDelete = (tourId) => {
    // Xác nhận xóa tour
    const confirmed = window.confirm('Are you sure you want to delete this tour?');
    if (confirmed) {
      const updatedTours = filteredTours.filter((tour) => tour.id !== tourId);
      setFilteredTours(updatedTours);
    };
  }
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = TourData.filter(
      (tour) =>
        tour.title.toLowerCase().includes(term) ||
        tour.city.toLowerCase().includes(term)
    );
    setFilteredTours(filtered);
  };
  const addTour = (newTour) => {
    setFilteredTours([...filteredTours, { id: filteredTours.length + 1, ...newTour }]);
  };
  return (
    <>
      <div className="listTour-container">
        <div className="row">
          <div className="d-flex justify-content-between mb-3">
            <div className="search-bar">
              <Input
                type="text"
                placeholder="Search tours..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <i className="ri-search-line search-icon"></i>
            </div>
            <Button color="primary" onClick={handleAdd}>
              Add Tour
            </Button>
          </div>
          {filteredTours.map((tour) => (
            <Col lg="3" className="mb-4" key={tour.id}>
              <AdminTourCard
                tour={tour}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              ></AdminTourCard>
            </Col>
          ))}
        </div>
      </div>
      <AddTour isOpen={isModalOpen} toggle={toggleModal} addTour={addTour} />
    </>
  )
}

export default ADTour