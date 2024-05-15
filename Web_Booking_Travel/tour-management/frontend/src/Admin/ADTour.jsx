import React, { useState } from 'react'
import TourData from '../assets/data/tours'
import { Col, Button, Input } from 'reactstrap'
import AdminTourCard from '../AdminComponent/AdminTourCard'
import '../styles/tourAdmin.css';
import AddTour from '../AdminComponent/AddTour';

const ADTour = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTours, setFilteredTours] = useState(TourData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleAdd = () => {
    toggleModal();
  };

  const handleUpdate = (tourId) => {
    // Mở modal hoặc form để sửa thông tin tour
    // Sau khi nhận được thông tin tour sửa đổi, cập nhật trong danh sách tours
    const updatedTours = filteredTours.map((tour) => {
      if (tour.id === tourId) {
        // Cập nhật thông tin tour
        return { ...tour, title: 'Updated Tour', city: 'Updated City', price: 200 };
      }
      return tour;
    });
    setFilteredTours(updatedTours);
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
                handleUpdate={handleUpdate}
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