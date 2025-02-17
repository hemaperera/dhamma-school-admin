import React, { useState } from 'react';
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BookDetailsPopup from './BookDetailsPopup'; // Importing the View Popup Component
import EditBookDetails from './EditBookDetails'; // Importing the Edit Popup Component
import DeleteBookPopup from './DeleteBookPopup'; // Importing the Delete Popup Component

// Dummy Data
const dummyBooks = [
  {
    id: 1,
    image: 'https://via.placeholder.com/120x80',
    name: 'Hibernate Core ~11th',
    category: 'Educational',
    language: 'English',
    availability: 'Available',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/120x80',
    name: 'Java Fundamentals ~10th',
    category: 'Educational',
    language: 'English',
    availability: 'Borrowed',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/120x80',
    name: 'Clean Code',
    category: 'Programming',
    language: 'English',
    availability: 'Available',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/120x80',
    name: 'Data Structures in C++',
    category: 'Technical',
    language: 'English',
    availability: 'Borrowed',
  },
];

export default function BookManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Columns definition for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Book Thumbnail"
          style={{ width: 80, height: 120, objectFit: 'cover' }}
        />
      ),
    },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'language', headerName: 'Language', width: 150 },
    { field: 'availability', headerName: 'Availability', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="inherit"
            size="small"
            sx={{ marginRight: 1, color: '#873636', '&:hover': { color: '#6b2a2a' } }}
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            sx={{ marginRight: 1, color: '#873636', '&:hover': { color: '#6b2a2a' } }}
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            sx={{ color: '#873636', '&:hover': { color: '#6b2a2a' } }}
            onClick={() => handleView(params.row.id)}
          >
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Filter data based on search
  const filteredBooks = dummyBooks.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = filteredBooks.map((book) => ({
    id: book.id,
    image: book.image,
    name: book.name,
    category: book.category,
    language: book.language,
    availability: book.availability,
  }));

  // Handle edit, delete, and view actions
  const handleEdit = (id) => {
    const book = dummyBooks.find((b) => b.id === id);
    if (book) {
      setSelectedBook(book);
      setEditPopupOpen(true);
    }
  };

  const handleDelete = (id) => {
    const book = dummyBooks.find((b) => b.id === id);
    if (book) {
      setSelectedBook(book);
      setDeletePopupOpen(true);
    }
  };

  const handleView = (id) => {
    const book = dummyBooks.find((b) => b.id === id);
    if (book) {
      setSelectedBook({
        ...book,
        authors: 'John Doe, Jane Smith',
        location: 'Floor 1, Shelf 3, Row 5',
        description: 'A detailed guide to Hibernate Core principles.',
        dateEntered: '2023-01-15',
      });
      setPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedBook(null);
  };

  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
    setSelectedBook(null);
  };

  const handleSaveEdit = (updatedBook) => {
    console.log('Save updated book:', updatedBook);
    setEditPopupOpen(false);
    setSelectedBook(null);
  };

  const handleConfirmDelete = (id) => {
    console.log('Confirm delete book with ID:', id);
    setDeletePopupOpen(false);
    setSelectedBook(null);
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h4" gutterBottom color="#873636">
        Book Management
      </Typography>

      {/* Search Bar and Add Book Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          label="Search by Name or Category"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '50%' }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#873636', color: 'white', '&:hover': { backgroundColor: '#6b2a2a' } }}
          onClick={() => navigate('/add-book')} // Navigate to AddBook page
        >
          Add Book
        </Button>
      </Box>

      {/* DataGrid */}
      <div style={{ height: '60vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
          rowHeight={160}
        />
      </div>

      {/* Book Details Popup */}
      {selectedBook && popupOpen && (
        <BookDetailsPopup
          open={popupOpen}
          handleClose={handleClosePopup}
          bookDetails={selectedBook}
        />
      )}

      {/* Edit Book Popup */}
      {selectedBook && editPopupOpen && (
        <EditBookDetails
          open={editPopupOpen}
          handleClose={handleCloseEditPopup}
          bookDetails={selectedBook}
          handleSave={handleSaveEdit}
        />
      )}

      {/* Delete Book Popup */}
      {selectedBook && deletePopupOpen && (
        <DeleteBookPopup
          open={deletePopupOpen}
          handleClose={() => setDeletePopupOpen(false)}
          bookDetails={selectedBook}
          handleDelete={handleConfirmDelete}
        />
      )}
    </Box>
  );
}