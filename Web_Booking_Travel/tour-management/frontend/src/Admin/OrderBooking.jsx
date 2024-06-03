import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box,
  TableSortLabel, IconButton, Menu, MenuItem, Snackbar, TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_URL } from '../utils/config';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MuiAlert from '@mui/material/Alert';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const OrderBooking = () => {
  const { data: orders, loading, error } = useFetch(`${BASE_URL}/booking/getAllBooking`);
  const [tourName, setTourName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearch = () => {
    const lowercasedTourName = tourName.toLowerCase();
    const lowercasedFullName = fullName.toLowerCase();
    const lowercasedEmail = email.toLowerCase();
    const lowercasedPhone = phone.toLowerCase();

    const filtered = orders.filter(order => 
      order.tourName.toLowerCase().includes(lowercasedTourName) &&
      order.fullName.toLowerCase().includes(lowercasedFullName) &&
      order.userEmail.toLowerCase().includes(lowercasedEmail) &&
      String(order.phoneNumber).toLowerCase().includes(lowercasedPhone)
    );
    setFilteredOrders(filtered);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredOrders].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredOrders(sorted);
  };

  const handleApprovePayment = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/booking/approvePayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) {
        throw new Error('Failed to approve payment');
      }
      setFilteredOrders(prevOrders => prevOrders.map(order => 
        order._id === orderId ? { ...order, isPaid: true } : order
      ));
    } catch (error) {
      console.error('Error approving payment:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      setFilteredOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Orders
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          <TextField
            fullWidth
            margin="normal"
            label="Tour Name"
            variant="outlined"
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            style={{ flex: '1 0 45%' }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Customer Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ flex: '1 0 45%' }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: '1 0 45%' }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ flex: '1 0 45%' }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          style={{ marginTop: '20px' }}
        >
          Search
        </Button>
      </Paper>

      {loading && <div>Loading...</div>}
      {error && <div>Error loading bookings: {error.message}</div>}
      {!loading && !error && Array.isArray(filteredOrders) && filteredOrders.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === 'index'}
                      direction={sortConfig.direction}
                      onClick={() => handleSort('index')}
                    >
                      STT
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === 'tourName'}
                      direction={sortConfig.direction}
                      onClick={() => handleSort('tourName')}
                    >
                      Tour Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === 'fullName'}
                      direction={sortConfig.direction}
                      onClick={() => handleSort('fullName')}
                    >
                      Customer Info
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === 'guestSize'}
                      direction={sortConfig.direction}
                      onClick={() => handleSort('guestSize')}
                    >
                      Guest Size
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === 'BookAt'}
                      direction={sortConfig.direction}
                      onClick={() => handleSort('BookAt')}
                    >
                      Booking Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                  <TableRow key={order._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{order.tourName}</TableCell>
                    <TableCell>
                      {order.fullName}<br />
                      {order.userEmail}<br />
                      {order.phoneNumber}
                    </TableCell>
                    <TableCell>{order.guestSize}</TableCell>
                    <TableCell>{new Date(order.BookAt).toLocaleDateString()}</TableCell>
                    <TableCell>{order.isPaid ? 'Paid' : 'Unpaid'}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleMenuClick(event, order)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl && selectedOrder?._id === order._id)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => { handleApprovePayment(order._id); handleMenuClose(); }}>
                          Approve Payment
                        </MenuItem>
                        <MenuItem onClick={() => { handleDeleteOrder(order._id); handleMenuClose(); }}>
                          Delete Order
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      {!loading && !error && filteredOrders.length === 0 && <div>No orders found.</div>}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" elevation={6} variant="filled">
          Order deleted successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default OrderBooking;
