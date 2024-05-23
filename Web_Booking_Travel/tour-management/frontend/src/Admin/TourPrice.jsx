import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, TableSortLabel, Paper, TextField, IconButton
} from '@mui/material';
import { FavoriteBorder, Edit, Delete } from '@mui/icons-material';
import '../styles/tourPrice.css'; // Import CSS file
const data = [
  { id: 1, tourName: 'Beach Paradise', destination: 'Hawaii', price: 1000, duration: 7 },
  { id: 2, tourName: 'Mountain Adventure', destination: 'Colorado', price: 800, duration: 5 },
  { id: 3, tourName: 'City Break', destination: 'New York', price: 600, duration: 3 },
  { id: 4, tourName: 'Cultural Tour', destination: 'Kyoto', price: 1200, duration: 10 },
  { id: 5, tourName: 'Desert Safari', destination: 'Dubai', price: 900, duration: 4 },
  { id: 6, tourName: 'Historic Journey', destination: 'Rome', price: 1100, duration: 8 },
  { id: 7, tourName: 'Tropical Escape', destination: 'Bali', price: 950, duration: 6 },
  { id: 8, tourName: 'European Highlights', destination: 'Paris', price: 1300, duration: 12 },
  { id: 9, tourName: 'Wildlife Expedition', destination: 'Kenya', price: 1500, duration: 14 },
];

const TourPrice = () => {
  const { state } = useContext(DarkModeContext);
  const [rows, setRows] = useState(data);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('tourName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTourName, setSearchTourName] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchDuration, setSearchDuration] = useState('');

  useEffect(() => {
    const filteredRows = data.filter(row =>
      row.tourName.toLowerCase().includes(searchTourName.toLowerCase()) &&
      row.destination.toLowerCase().includes(searchDestination.toLowerCase()) &&
      row.price.toString().includes(searchPrice) &&
      row.duration.toString().includes(searchDuration)
    );
    setRows(filteredRows);
  }, [searchTourName, searchDestination, searchPrice, searchDuration]);

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

      if (orderBy === 'tourName' || orderBy === 'destination') {
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
    <div className={`price-container ${state.darkMode ? 'dark' : ''}`}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['Tour Name', 'Destination', 'Price', 'Duration'].map((headCell) => (
                  <TableCell
                    key={headCell}
                    className="price-header-cell"
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
                <TableCell className="price-actions-cell">Actions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="price-header-cell">
                  <TextField
                    label="Search Tour Name"
                    variant="outlined"
                    fullWidth
                    value={searchTourName}
                    onChange={(e) => setSearchTourName(e.target.value)}
                    className="price-header-search"
                  />
                </TableCell>
                <TableCell className="price-header-cell">
                  <TextField
                    label="Search Destination"
                    variant="outlined"
                    fullWidth
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="price-header-search"
                  />
                </TableCell>
                <TableCell className="price-header-cell">
                  <TextField
                    label="Search Price"
                    variant="outlined"
                    fullWidth
                    value={searchPrice}
                    onChange={(e) => setSearchPrice(e.target.value)}
                    className="price-header-search"
                  />
                </TableCell>
                <TableCell className="price-header-cell">
                  <TextField
                    label="Search Duration"
                    variant="outlined"
                    fullWidth
                    value={searchDuration}
                    onChange={(e) => setSearchDuration(e.target.value)}
                    className="price-header-search"
                  />
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.tourName}</TableCell>
                    <TableCell>{row.destination}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>
                      <IconButton className="price-action-button">
                        <FavoriteBorder />
                      </IconButton>
                      <IconButton className="price-action-button">
                        <Edit />
                      </IconButton>
                      <IconButton className="price-action-button">
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
          className="price-pagination"
        />
      </Paper>
    </div>
  );
};

export default TourPrice;
