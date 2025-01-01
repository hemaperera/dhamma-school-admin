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
import { useNavigate } from 'react-router-dom';
import ViewDigitalBookPopup from './ViewDigitalBookPopup'; // Importing the View Popup Component
import EditDigitalBookPopup from './EditDigitalBookPopup'; // Importing the Edit Popup Component
import DeleteDigitalBookPopup from './DeleteDigitalBookPopup'; // Importing the Delete Popup Component
import UploadDigitalBook from './UploadDigitalBook';

// Dummy Data
const dummyDigitalBooks = [
  {
    id: 1,
    name: 'React Essentials',
    category: 'Programming',
    language: 'English',
    uploadDate: '2023-12-15',
    downloadCount: 120,
  },
  {
    id: 2,
    name: 'Node.js Guide',
    category: 'Web Development',
    language: 'English',
    uploadDate: '2023-11-10',
    downloadCount: 98,
  },
  {
    id: 3,
    name: 'UI/UX Fundamentals',
    category: 'Design',
    language: 'English',
    uploadDate: '2023-10-20',
    downloadCount: 45,
  },
  {
    id: 4,
    name: 'Python Basics',
    category: 'Programming',
    language: 'English',
    uploadDate: '2023-09-25',
    downloadCount: 150,
  },
];

export default function DigitalBookInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  // Columns definition for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'language', headerName: 'Language', width: 150 },
    { field: 'uploadDate', headerName: 'Upload Date', width: 150 },
    { field: 'downloadCount', headerName: 'Download Count', width: 150 },
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
  const filteredBooks = dummyDigitalBooks.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    category: book.category,
    language: book.language,
    uploadDate: book.uploadDate,
    downloadCount: book.downloadCount,
  }));

  // Handle actions
  const handleEdit = (id) => {
    const book = dummyDigitalBooks.find((b) => b.id === id);
    if (book) {
      setSelectedBook(book);
      setEditPopupOpen(true);
    }
  };

  const handleDelete = (id) => {
    const book = dummyDigitalBooks.find((b) => b.id === id);
    if (book) {
      setSelectedBook(book);
      setDeletePopupOpen(true);
    }
  };

  const handleView = (id) => {
    const book = dummyDigitalBooks.find((b) => b.id === id);
    if (book) {
      setSelectedBook(book);
      setViewPopupOpen(true);
    }
  };

  const handleCloseViewPopup = () => {
    setViewPopupOpen(false);
    setSelectedBook(null);
  };

  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
    setSelectedBook(null);
  };

  const handleConfirmDelete = (id) => {
    console.log('Confirm delete digital book with ID:', id);
    setDeletePopupOpen(false);
    setSelectedBook(null);
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h4" gutterBottom color="#873636">
        Digital Book Inventory
      </Typography>

      {/* Search Bar and Add Book Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          label="Search by Name, Category, or Language"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '50%' }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#873636', color: 'white', '&:hover': { backgroundColor: '#6b2a2a' } }}
          onClick={() => navigate('/UploadDigitalBook')} // Navigate to AddDigitalBook page
        >
          Add Digital Book
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
          rowHeight={60}
        />
      </div>

      {/* View Digital Book Popup */}
      {selectedBook && viewPopupOpen && (
        <ViewDigitalBookPopup
          open={viewPopupOpen}
          handleClose={handleCloseViewPopup}
          bookDetails={selectedBook}
        />
      )}

      {/* Edit Digital Book Popup */}
      {selectedBook && editPopupOpen && (
        <EditDigitalBookPopup
          open={editPopupOpen}
          handleClose={handleCloseEditPopup}
          bookDetails={selectedBook}
        />
      )}

      {/* Delete Digital Book Popup */}
      {selectedBook && deletePopupOpen && (
        <DeleteDigitalBookPopup
          open={deletePopupOpen}
          handleClose={() => setDeletePopupOpen(false)}
          bookDetails={selectedBook}
          handleDelete={handleConfirmDelete}
        />
      )}
    </Box>
  );
}