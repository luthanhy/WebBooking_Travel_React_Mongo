import React, { useState, useEffect, useContext } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, TableSortLabel, Paper, TextField, IconButton
} from '@mui/material';
import { FavoriteBorder, Edit, Delete } from '@mui/icons-material';
import '../styles/customer.css'; // Import CSS file
// import { DarkModeContext } from '../context/DarkModeContext';
const data = [
  { id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61 },
  { id: 2, name: 'Tiger Nixon', position: 'Accountant', office: 'Tokyo', age: 63 },
  { id: 3, name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', age: 66 },
  { id: 4, name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', age: 22 },
  { id: 5, name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', age: 33 },
  { id: 6, name: 'Brielle Williamson', position: 'Integration Specialist', office: 'New York', age: 61 },
  { id: 7, name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', age: 59 },
  { id: 8, name: 'Rhona Davidson', position: 'Integration Specialist', office: 'Tokyo', age: 55 },
  { id: 9, name: 'Colleen Hurst', position: 'Javascript Developer', office: 'San Francisco', age: 39 },
  // Add more data as needed
];

const Customer = () => {
  // const { state } = useContext(DarkModeContext);
  const [rows, setRows] = useState(data);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState('');
  const [searchPosition, setSearchPosition] = useState('');
  const [searchOffice, setSearchOffice] = useState('');
  const [searchAge, setSearchAge] = useState('');

  useEffect(() => {
    const filteredRows = data.filter(row =>
      row.name.toLowerCase().includes(searchName.toLowerCase()) &&
      row.position.toLowerCase().includes(searchPosition.toLowerCase()) &&
      row.office.toLowerCase().includes(searchOffice.toLowerCase()) &&
      row.age.toString().includes(searchAge)
    );
    setRows(filteredRows);
  }, [searchName, searchPosition, searchOffice, searchAge]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    console.log('Sorting data...');
    const sortedRows = [...rows].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (orderBy === 'name' || orderBy === 'position' || orderBy === 'office') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
    setRows(sortedRows);
  }, [order, orderBy]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    // ${state.darkMode ? 'dark' : ''}
    <div className={`customer-container`}> 
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'Position', 'Office', 'Age'].map((headCell) => (
                  <TableCell
                    key={headCell}
                    className="customer-header-cell"
                    sortDirection={orderBy === headCell.toLowerCase() ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.toLowerCase()}
                      direction={orderBy === headCell.toLowerCase() ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, headCell.toLowerCase())}
                    >
                      {headCell}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell className="customer-actions-cell">Actions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="customer-header-cell">
                  <TextField
                    label="Search Name"
                    variant="outlined"
                    fullWidth
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="customer-header-search"
                  />
                </TableCell>
                <TableCell className="customer-header-cell">
                  <TextField
                    label="Search Position"
                    variant="outlined"
                    fullWidth
                    value={searchPosition}
                    onChange={(e) => setSearchPosition(e.target.value)}
                    className="customer-header-search"
                  />
                </TableCell>
                <TableCell className="customer-header-cell">
                  <TextField
                    label="Search Office"
                    variant="outlined"
                    fullWidth
                    value={searchOffice}
                    onChange={(e) => setSearchOffice(e.target.value)}
                    className="customer-header-search"
                  />
                </TableCell>
                <TableCell className="customer-header-cell">
                  <TextField
                    label="Search Age"
                    variant="outlined"
                    fullWidth
                    value={searchAge}
                    onChange={(e) => setSearchAge(e.target.value)}
                    className="customer-header-search"
                  />
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.position}</TableCell>
                    <TableCell>{row.office}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>
                      <IconButton className="customer-action-button">
                        <FavoriteBorder />
                      </IconButton>
                      <IconButton className="customer-action-button">
                        <Edit />
                      </IconButton>
                      <IconButton className="customer-action-button">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          className="customer-pagination"
        />
      </Paper>
    </div>
  );
};

export default Customer;
