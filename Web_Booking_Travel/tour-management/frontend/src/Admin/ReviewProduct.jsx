import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const ReviewProduct = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/reviewproduct', {
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
    try {
      const response = await fetch('http://localhost:4000/api/v1/tours', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tour)
      });
      if (response.ok) {
        await fetch(`http://localhost:4000/api/v1/reviewproduct/${tour._id}`, {
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
  };

  const handleRefuse = async (tourId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/reviewproduct/${tourId}`, {
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
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="review-product-container">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Imange</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tours.map(tour => (
                <TableRow key={tour._id}>
                  <TableCell>{tour.title}</TableCell>
                  <TableCell>{tour.city}</TableCell>
                  <TableCell>
                <img src={tour.photo} style={{ width: '300px', height: 'auto' }} />
              </TableCell>
                  <TableCell>
                    <Button onClick={() => handleAccept(tour)} variant="contained" color="primary">
                      <CheckIcon />
                      Accept
                    </Button>
                    <Button onClick={() => handleRefuse(tour._id)} variant="contained" color="secondary">
                      <CloseIcon />
                      Refuse
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ReviewProduct;
