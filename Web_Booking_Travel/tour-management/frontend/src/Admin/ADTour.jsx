import React, { useState, useEffect } from 'react';
import { Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import AdminTourCard from '../AdminComponent/AdminTourCard';
import '../styles/tourAdmin.css';
import AddTour from '../AdminComponent/AddTour';
import Pagination from '../shared/pagination';
import { BASE_URL } from '../utils/config';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const ADTour = () => {
  const { data: featuredData } = useFetch(`${BASE_URL}/tours/`);
  const [, setTourCount] = useState(0);  // Add tourCount state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTours, setFilteredTours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [currentTour, setCurrentTour] = useState(null);
  const navigate = useNavigate();

  // Fetch data and set initial state
  useEffect(() => {
    if (featuredData) {
      setFilteredTours(featuredData);
      setTourCount(featuredData.length);
    }
  }, [featuredData]);  // Add featuredData as dependency

  // Filter tours based on search term
  useEffect(() => {
    if (featuredData) {
      const filtered = featuredData.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTours(filtered);
      setTourCount(filtered.length);
    }
  }, [searchTerm, featuredData]);  // Add searchTerm and featuredData as dependencies

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleAdd = () => {
    toggleModal();
  };

  const updateTour = async (tourId, updatedTour) => {
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTour),
      });

      if (!response.ok) {
        throw new Error('Failed to update tour');
      }

      const result = await response.json();
      const updatedTours = filteredTours.map((tour) =>
        tour._id === tourId ? result : tour
      );
      setFilteredTours(updatedTours);
    } catch (error) {
      console.error('Error updating tour:', error);
    }
  };

  const handleEdit = (tour) => {
    setCurrentTour(tour);
    toggleEditModal();
  };

  const handleDelete = async (tourId) => {
    const confirmed = window.confirm('Are you sure you want to delete this tour?');
    if (confirmed) {
      try {
        const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete tour');
        }

        const updatedTours = filteredTours.filter((tour) => tour._id !== tourId);
        setFilteredTours(updatedTours);
        setTourCount(updatedTours.length);
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const addTour = async(newTour) => {
    const updatedTours = [...filteredTours, newTour];
    try{
        const res = await fetch(`${BASE_URL}/tours`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTour)
        })
        if(!res.ok) {
          setError("Error")
        }
        const result = await res.json();
        console.log("luthanht", result.data);
    }catch(err){
      setError(err)
    }
    console.log("luthanhy123", updatedTours)
    navigate('/admin/tours');
  };

  const displayedTours = filteredTours.slice((page - 1) * limit, page * limit);
  const totalPage = Math.ceil(filteredTours.length / limit);

  const handlePageChange = (value) => {
    if (value === "&laquo;") {
      setPage(1);
    } else if (value === "&lsaquo;" && page > 1) {
      setPage(page - 1);
    } else if (value === "&rsaquo;" && page < totalPage) {
      setPage(page + 1);
    } else if (value === "&raquo;") {
      setPage(totalPage);
    } else if (typeof value === 'number') {
      setPage(value);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTour(currentTour._id, currentTour);
    toggleEditModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTour({ ...currentTour, [name]: value });
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
          {displayedTours.map((tour) => (
            <Col lg="3" className="mb-4" key={tour._id}>
              <AdminTourCard
                tour={tour}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </Col>
          ))}
        </div>
        <div className="pagination-container">
          <Pagination
            total={totalPage}
            current={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <AddTour isOpen={isModalOpen} toggle={toggleModal} addTour={addTour} />
      {currentTour && (
        <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
          <ModalHeader toggle={toggleEditModal}>Edit Tour</ModalHeader>
          <ModalBody>
          {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleUpdate}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={currentTour.title}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  value={currentTour.city}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="Distance">Distance</Label>
                <Input
                  type="text"
                  name="distance"
                  id="distance"
                  value={currentTour.distance}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  value={currentTour.price}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="desc"
                  value={currentTour.description}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image URL</Label>
                <Input
                  type="text"
                  name="image"
                  id="photo"
                  value={currentTour.image}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button type="submit" color="primary">Update Tour</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default ADTour;
