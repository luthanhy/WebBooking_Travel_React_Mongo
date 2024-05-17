import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Label } from 'reactstrap';
import { ReviewContext } from '../context/ReviewContext';
import '../styles/uploadcontent.css'; // Add this line to import CSS

const UploadContent = () => {
  const [tour, setTour] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const { addReview } = useContext(ReviewContext);

  const handleSubmit = () => {
    const newReview = {
      id: Date.now(),
      name: tour,
      location: location,
      price: price,
      accepted: false,
      refused: false,
    };
    addReview(newReview);
    setTour('');
    setLocation('');
    setPrice('');
  };

  return (
    <Container className="upload-content-container">
      <Row>
        <Col lg='12'>
          <div className='d-flex align-items-center justify-content-center'>
            <h1>User Upload Content</h1>
          </div>
          <Form className="upload-content-form text-center">
            <FormGroup>
              <Label className="info-upload">Tour:</Label>
              <input 
                type="text" 
                placeholder='Tour Name' 
                value={tour} 
                onChange={(e) => setTour(e.target.value)} 
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <Label className="info-upload">Location:</Label>
              <input 
                type="text" 
                placeholder='Location' 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <Label className="info-upload">Price:</Label>
              <input 
                type="text" 
                placeholder='Price' 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="form-control"
              />
            </FormGroup>
            <Button className="btn primary__btn" onClick={handleSubmit}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadContent;
