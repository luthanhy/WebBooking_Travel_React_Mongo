import React, { useState, useEffect } from 'react';
import {
  Card, CardActions, CardContent, CardMedia, Grid, Button, Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { BASE_URL } from '../utils/config';
import '../styles/productReview.css';

const ReviewProduct = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${BASE_URL}/reviewproduct`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTours(data.tours);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Something went wrong');
      }
    };

    fetchTours();
  }, []);

  const handleAccept = async (tour) => {
    const confirmAccept = window.confirm('Are you sure you want to accept this tour?');
    if (confirmAccept) {
      try {
        const response = await fetch(`${BASE_URL}/tours`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tour)
        });
        if (response.ok) {
          await fetch(`${BASE_URL}/reviewproduct/${tour._id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
              'Content-Type': 'application/json'
            }
          });
          setTours(tours.filter(t => t._id !== tour._id));
        } else {
          const data = await response.json();
          setError(data.message);
        }
      } catch (error) {
        setError('Something went wrong');
      }
    }
  };

  const handleRefuse = async (tourId) => {
    const confirmRefuse = window.confirm('Are you sure you want to refuse this tour?');
    if (confirmRefuse) {
      try {
        const response = await fetch(`${BASE_URL}/reviewproduct/${tourId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          setTours(tours.filter(t => t._id !== tourId));
        } else {
          const data = await response.json();
          setError(data.message);
        }
      } catch (error) {
        setError('Something went wrong');
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="review-product-container" style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {tours.map(tour => (
          <Grid item key={tour._id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={tour.image}
                alt={tour.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {tour.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tour.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${tour.price}/per person
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleAccept(tour)} variant="contained" color="primary" startIcon={<CheckIcon />}>
                  Accept
                </Button>
                <Button onClick={() => handleRefuse(tour._id)} variant="contained" color="secondary" startIcon={<CloseIcon />}>
                  Refuse
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ReviewProduct;
