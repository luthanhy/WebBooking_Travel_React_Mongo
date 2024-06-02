import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const AddTour = ({ isOpen, toggle, addTour }) => {
  const [newTour, setNewTour] = useState({
   title: '',
    city: '',
    address: '',
    price: '',
    desc: '',
    distance:'',
    photo: '',
    maxGroupSize:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTour({ ...newTour, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(" ",newTour);
    e.preventDefault();
    addTour(newTour);
    // toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Tour</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
         <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={newTour.title}
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
                  value={newTour.city}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  value={newTour.address}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="desc"
                  id="desc"
                  value={newTour.desc}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Distance">Distance</Label>
                <Input
                  type="number"
                  name="distance"
                  id="distance"
                
                  value={newTour.distance}
                  min = "1"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  value={newTour.price}
                  min = "1"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image URL</Label>
                <Input
                  type="text"
                  name="photo"
                  id="photo"
                  value={newTour.photo}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="maxGroupSize">Max Size Group</Label>
                <Input
                  type="number"
                  name="maxGroupSize"
                  id="maxGroupSize"
                  value={newTour.maxGroupSize}
                  min = "1"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
          <Button type="submit" color="primary">Add Tour</Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTour;
