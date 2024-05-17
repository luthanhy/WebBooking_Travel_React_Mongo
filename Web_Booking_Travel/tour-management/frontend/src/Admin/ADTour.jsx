import React, { useState ,useEffect} from 'react';
import { Col, Button, Input } from 'reactstrap';
import AdminTourCard from '../AdminComponent/AdminTourCard';
import '../styles/tourAdmin.css';
import AddTour from '../AdminComponent/AddTour';
import Pagination from '../shared/pagination';
import { BASE_URL } from '../utils/config';
import useFetch from '../hooks/useFetch';

const ADTour = () => {
  const {data:featuredData,error,loading } = useFetch(`${BASE_URL}/tours/`);
  

  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTours, setFilteredTours] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);  // Start from page 1
  const [limit, setLimit] = useState(8);
  useEffect(() => {
    if (featuredData) {
      setFilteredTours(featuredData);
    }
  }, [featuredData]);
  console.log(filteredTours);

  console.log(featuredData)
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleAdd = () => {
    toggleModal();
  };

  const handleUpdate = (tourId) => {
    const updatedTours = filteredTours.map((tour) => {
      if (tour._id === tourId) {
        return { ...tour, title: 'Updated Tour', city: 'Updated City', price: 200 };
      }
      return tour;
    });
    setFilteredTours(updatedTours);
  };

  const handleDelete = (tourId) => {
    const confirmed = window.confirm('Are you sure you want to delete this tour?');
    if (confirmed) {
      const updatedTours = filteredTours.filter((tour) => tour._id !== tourId);
      setFilteredTours(updatedTours);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = featuredData.filter(
      (tour) =>
        tour.title.toLowerCase().includes(term) ||
        tour.city.toLowerCase().includes(term)
    );
    setFilteredTours(filtered);
  };

  const addTour = (newTour) => {
    setFilteredTours([...filteredTours, { __id: filteredTours.length + 1, ...newTour }]);
  };

  const displayedTours = filteredTours.slice((page - 1) * limit, page * limit);
  console.log(filteredTours)
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
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              ></AdminTourCard>
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
    </>
  );
};

export default ADTour;
