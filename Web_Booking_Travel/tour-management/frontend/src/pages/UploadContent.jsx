import React, { useState } from 'react';
import {
  TextField, Button, Paper, Container, Typography
} from '@mui/material';

const UploadTour = () => {
  const [form, setForm] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    photo: '',
    desc: '',
    price: 0,
    maxGroupSize: 0,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/v1/reviewproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Tour submitted for review.');
        setForm({
          title: '',
          city: '',
          address: '',
          distance: 0,
          photo: '',
          desc: '',
          price: 0,
          maxGroupSize: 0,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Something went wrong.');
    }
  };

  return (
    <Container>
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Tour
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="city"
            label="City"
            value={form.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="distance"
            label="Distance"
            type="number"
            value={form.distance}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="photo"
            label="Photo URL"
            value={form.photo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="desc"
            label="Description"
            value={form.desc}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="maxGroupSize"
            label="Max Group Size"
            type="number"
            value={form.maxGroupSize}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" color="primary" variant="contained" style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UploadTour;
