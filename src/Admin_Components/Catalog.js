import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { Button } from '@mui/material';

// Custom toolbar for DataGrid
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport slotProps={{ tooltip: { title: 'Export data' }, button: { variant: 'outlined' } }} />
    </GridToolbarContainer>
  );
}

// Borrowed books table data
const borrowedBooksData = [
    { id: 1, name: 'Samith Gunasekara', numBooks: 3, dueDate: '2024-12-20', borrowedDate: '2024-12-10' },
    { id: 2, name: 'Nimal Perera', numBooks: 5, dueDate: '2024-12-22', borrowedDate: '2024-12-12' },
    { id: 3, name: 'Kamal Silva', numBooks: 2, dueDate: '2024-12-25', borrowedDate: '2024-12-15' },
    { id: 4, name: 'Samantha Fernando', numBooks: 4, dueDate: '2024-12-28', borrowedDate: '2024-12-18' },
    { id: 5, name: 'Ravi Kumar', numBooks: 6, dueDate: '2024-12-30', borrowedDate: '2024-12-20' },
    { id: 6, name: 'Jessica Brown', numBooks: 1, dueDate: '2024-12-18', borrowedDate: '2024-12-10' },
    { id: 7, name: 'Sarah Lee', numBooks: 3, dueDate: '2024-12-26', borrowedDate: '2024-12-16' },
    { id: 8, name: 'John Doe', numBooks: 2, dueDate: '2024-12-24', borrowedDate: '2024-12-14' },
    { id: 9, name: 'Michael Clark', numBooks: 7, dueDate: '2024-12-29', borrowedDate: '2024-12-19' },
    { id: 10, name: 'Emily Adams', numBooks: 4, dueDate: '2024-12-23', borrowedDate: '2024-12-13' },
  ];
// Overdue books table data
const overdueBooksData = [
    { id: 1, name: 'Kamal Silva', numBooks: 2, dueDate: '2024-12-05', borrowedDate: '2024-12-01' },
    { id: 2, name: 'Samantha Fernando', numBooks: 4, dueDate: '2024-12-07', borrowedDate: '2024-12-02' },
    { id: 3, name: 'Samith Gunasekara', numBooks: 3, dueDate: '2024-12-10', borrowedDate: '2024-12-01' },
    { id: 4, name: 'Nimal Perera', numBooks: 5, dueDate: '2024-12-11', borrowedDate: '2024-12-01' },
    { id: 5, name: 'Ravi Kumar', numBooks: 6, dueDate: '2024-12-15', borrowedDate: '2024-12-05' },
    { id: 6, name: 'Jessica Brown', numBooks: 1, dueDate: '2024-12-12', borrowedDate: '2024-12-01' },
    { id: 7, name: 'Sarah Lee', numBooks: 3, dueDate: '2024-12-14', borrowedDate: '2024-12-01' },
    { id: 8, name: 'John Doe', numBooks: 2, dueDate: '2024-12-15', borrowedDate: '2024-12-02' },
    { id: 9, name: 'Michael Clark', numBooks: 7, dueDate: '2024-12-16', borrowedDate: '2024-12-05' },
    { id: 10, name: 'Emily Adams', numBooks: 4, dueDate: '2024-12-10', borrowedDate: '2024-12-03' },
  ];

// Borrowed Books table columns
const borrowedBooksColumns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'numBooks', headerName: 'Number of Books', width: 180 },
  { field: 'dueDate', headerName: 'Due Date', width: 180 },
  { field: 'borrowedDate', headerName: 'Borrowed Date', width: 180 },
  {
    field: 'details',
    headerName: 'More Details',
    width: 180,
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#873636', // Primary color for the button
          color: '#FFB397', // Secondary color for the text
          '&:hover': {
            backgroundColor: '#FFB397', // Hover background color
            color: '#873636', // Hover text color
          },
        }}
        onClick={() => alert(`More details for ${params.row.name}`)}
      >
        More Details
      </Button>
    ),
  },
];

// Overdue Books table columns
const overdueBooksColumns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'numBooks', headerName: 'Number of Books', width: 180 },
  { field: 'dueDate', headerName: 'Due Date', width: 180 },
  { field: 'borrowedDate', headerName: 'Borrowed Date', width: 180 },
  {
    field: 'details',
    headerName: 'More Details',
    width: 180,
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#873636', // Primary color for the button
          color: '#FFB397', // Secondary color for the text
          '&:hover': {
            backgroundColor: '#FFB397', // Hover background color
            color: '#873636', // Hover text color
          },
        }}
        onClick={() => alert(`More details for ${params.row.name}`)}
      >
        More Details
      </Button>
    ),
  },
];

export default function ToggleableTables() {
  const [showBorrowedBooks, setShowBorrowedBooks] = useState(true); // State to toggle between tables

  const toggleTable = () => {
    setShowBorrowedBooks(!showBorrowedBooks); // Toggle between borrowed books and overdue books
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {/* Buttons to toggle between the two tables */}
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          color={showBorrowedBooks ? 'secondary' : 'primary'}
          onClick={toggleTable}
          sx={{
            backgroundColor: showBorrowedBooks ? '#FFB397' : '#873636', // Set background color
            color: showBorrowedBooks ? '#873636' : '#FFB397', // Set text color
            '&:hover': {
              backgroundColor: showBorrowedBooks ? '#FFB397' : '#873636', // Set hover background
              color: showBorrowedBooks ? '#873636' : '#FFB397', // Set hover text color
            },
            marginRight: 2,
          }}
        >
          Borrowed Books
        </Button>
        <Button
          variant="contained"
          color={showBorrowedBooks ? 'primary' : 'secondary'}
          onClick={toggleTable}
          sx={{
            backgroundColor: showBorrowedBooks ? '#873636' : '#FFB397', // Set background color
            color: showBorrowedBooks ? '#FFB397' : '#873636', // Set text color
            '&:hover': {
              backgroundColor: showBorrowedBooks ? '#873636' : '#FFB397', // Set hover background
              color: showBorrowedBooks ? '#FFB397' : '#873636', // Set hover text color
            },
          }}
        >
          Overdue Books
        </Button>
      </Box>

      {/* Display DataGrid for the selected table */}
      <DataGrid
        rows={showBorrowedBooks ? borrowedBooksData : overdueBooksData}
        columns={showBorrowedBooks ? borrowedBooksColumns : overdueBooksColumns}
        components={{ Toolbar: CustomToolbar }}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}