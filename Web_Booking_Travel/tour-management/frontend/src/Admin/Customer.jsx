import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper, IconButton, Modal, TextField, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    accountType: '',
    role: ''
  });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null); // State để lưu id của user cần xóa

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/user', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data.allUser);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Something went wrong');
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentEditUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      accountType: user.accountType,
      role: user.role
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!currentEditUser) {
      setError('Current user is not valid');
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/api/v1/user/${currentEditUser._id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(users.map(user => (user._id === currentEditUser._id ? data.data : user)));
        setEditModalOpen(false);
        setCurrentEditUser(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const handleDelete = async (userId) => {
    setDeleteUserId(userId); 
    setConfirmDeleteOpen(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/user/${deleteUserId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== deleteUserId)); 
        setConfirmDeleteOpen(false); 
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const handleEditFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedUsers = users.sort((a, b) => {
    if (orderBy === 'name') {
      return (a.username < b.username ? -1 : 1) * (order === 'asc' ? 1 : -1);
    }
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="customer-container">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map(user => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.accountType}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <div className="edit-modal" style={modalStyle}>
          <h2>Edit User</h2>
          <TextField
            name="username"
            label="Username"
            value={editForm.username}
            onChange={handleEditFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={editForm.email}
            onChange={handleEditFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="accountType"
            label="Account Type"
            value={editForm.accountType}
            onChange={handleEditFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="role"
            label="Role"
            value={editForm.role}
            onChange={handleEditFormChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleEditSubmit} color="primary" variant="contained" style={{ marginTop: '20px' }}>
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <div className="confirm-delete-modal" style={modalStyle}>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this user?</p>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
};

export default Customer;