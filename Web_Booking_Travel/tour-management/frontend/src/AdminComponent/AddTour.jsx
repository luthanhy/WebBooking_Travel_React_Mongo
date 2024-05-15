import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import tours from '../assets/data/tours';


const AddTour = ({ isOpen, toggle, addTour }) => {
  const [tourData, setTourData] = useState(tours);

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTour(tourData);
    toggle();
    setTourData(tours);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Tour</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" id="title" value={tourData.title} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" value={tourData.city} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={tourData.address} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="distance">Distance</Label>
            <Input type="text" name="distance" id="distance" value={tourData.distance} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input type="number" name="price" id="price" value={tourData.price} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="maxGroupSize">Max Group Size</Label>
            <Input type="text" name="maxGroupSize" id="maxGroupSize" value={tourData.maxGroupSize} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input type="text" name="desc" id="desc" value={tourData.desc} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Photo URL</Label>
            <Input type="text" name="photo" id="photo" value={tourData.photo} onChange={handleChange} />
          </FormGroup>
      
          <Button type="submit" color="primary">Add Tour</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddTour;