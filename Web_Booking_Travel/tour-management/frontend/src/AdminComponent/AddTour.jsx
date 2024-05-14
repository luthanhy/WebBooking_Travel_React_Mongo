import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const AddTourModal = ({ isOpen, toggle, addTour }) => {
  const [tourData, setTourData] = useState({
    title: '',
    city: '',
    price: 0,
    photo: ''
  });

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTour(tourData);
    toggle();
    setTourData({ title: '', city: '', price: 0, photo: '' });
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
            <Label for="price">Price</Label>
            <Input type="number" name="price" id="price" value={tourData.price} onChange={handleChange} />
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

export default AddTourModal;