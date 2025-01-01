import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import BorrowDetailsPopup from './BorrowDetailsPopup'; // Import the popup component

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

// Borrowed books data
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
  { id: 11, name: 'Tom Hardy', numBooks: 2, dueDate: '2024-12-27', borrowedDate: '2024-12-18' },
  { id: 12, name: 'Amal Rajapaksha', numBooks: 5, dueDate: '2024-12-22', borrowedDate: '2024-12-11' },
];

// Overdue books data
const overdueBooksData = [
  { id: 1, name: 'Kamal Silva', numBooks: 2, dueDate: '2024-12-05', borrowedDate: '2024-12-01' },
  { id: 2, name: 'Samantha Fernando', numBooks: 4, dueDate: '2024-12-07', borrowedDate: '2024-12-02' },
  { id: 3, name: 'Samith Gunasekara', numBooks: 3, dueDate: '2024-12-10', borrowedDate: '2024-12-01' },
  { id: 4, name: 'Nimal Perera', numBooks: 5, dueDate: '2024-12-11', borrowedDate: '2024-12-01' },
  { id: 5, name: 'Jessica Brown', numBooks: 1, dueDate: '2024-12-12', borrowedDate: '2024-12-01' },
  { id: 6, name: 'Ravi Kumar', numBooks: 6, dueDate: '2024-12-15', borrowedDate: '2024-12-05' },
  { id: 7, name: 'Sarah Lee', numBooks: 3, dueDate: '2024-12-14', borrowedDate: '2024-12-01' },
  { id: 8, name: 'John Doe', numBooks: 2, dueDate: '2024-12-15', borrowedDate: '2024-12-02' },
  { id: 9, name: 'Michael Clark', numBooks: 7, dueDate: '2024-12-16', borrowedDate: '2024-12-05' },
  { id: 10, name: 'Emily Adams', numBooks: 4, dueDate: '2024-12-10', borrowedDate: '2024-12-03' },
  { id: 11, name: 'Priya Nadarajah', numBooks: 3, dueDate: '2024-12-08', borrowedDate: '2024-11-28' },
  { id: 12, name: 'Hasitha Perera', numBooks: 2, dueDate: '2024-12-09', borrowedDate: '2024-12-01' },
];

// Columns configuration
const createColumns = (openPopup) => [
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
          backgroundColor: '#873636',
          color: '#FFB397',
          '&:hover': { backgroundColor: '#FFB397', color: '#873636' },
        }}
        onClick={() => openPopup(params.row)}
      >
        More Details
      </Button>
    ),
  },
];

export default function ToggleableTables() {
  const [showBorrowedBooks, setShowBorrowedBooks] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenPopup = (row) => {
    setSelectedRow(row);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedRow(null);
  };

  const columns = createColumns(handleOpenPopup);
  const rows = showBorrowedBooks ? borrowedBooksData : overdueBooksData;

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={() => setShowBorrowedBooks(true)}
          sx={{
            backgroundColor: showBorrowedBooks ? '#FFB397' : '#873636',
            color: showBorrowedBooks ? '#873636' : '#FFB397',
            marginRight: 2,
          }}
        >
          Borrowed Books
        </Button>
        <Button
          variant="contained"
          onClick={() => setShowBorrowedBooks(false)}
          sx={{
            backgroundColor: !showBorrowedBooks ? '#FFB397' : '#873636',
            color: !showBorrowedBooks ? '#873636' : '#FFB397',
          }}
        >
          Overdue Books
        </Button>
      </Box>

      {/* DataGrid */}
      <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: CustomToolbar }}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </div>

      {/* Popup */}
      {selectedRow && (
        <BorrowDetailsPopup
          open={popupOpen}
          handleClose={handleClosePopup}
          transactionDetails={selectedRow}
        />
      )}
    </Box>
  );
}