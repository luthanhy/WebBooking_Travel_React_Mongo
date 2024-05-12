import React from 'react'
import TourData from '../assets/data/tours'
import { Col } from 'reactstrap'
import AdminTourCard from './AdminTourCard'

const ADTour  = ( ) => {
  const handleAdd = () => {
    // Xử lý khi nhấn nút Add
  };
  
  const handleEdit = () => {
    // Xử lý khi nhấn nút Edit
  };
  
  const handleDelete = () => {
    // Xử lý khi nhấn nút Delete
  };
  
  return <>
  
{
    TourData?.map(tour=>(
        <Col lg="3" className="mb-4" key={tour.id}>
            <AdminTourCard tour={tour}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDelete={handleDelete}>      
            </AdminTourCard>
        </Col>
    ))
}
  
  </>
}

export default ADTour;