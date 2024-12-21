import * as React from 'react';
import { Box, IconButton, TextField, Typography, Button } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';

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
  
  // Columns definition for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'image',
      headerName: 'Image',
      width: 120, // Adjusted width
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt="Book Thumbnail" 
          style={{ width: 80, height: 120, objectFit: 'cover' }} // Larger height than width
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

  const rows = filteredBooks.map(book => ({
    id: book.id,
    image: book.image,
    name: book.name,
    category: book.category,
    language: book.language,
    availability: book.availability,
  }));

  // Handle edit, delete, and view actions
  const handleEdit = (id) => {
    console.log('Edit book with ID:', id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log('Delete book with ID:', id);
    // Add your delete logic here
  };

  const handleView = (id) => {
    console.log('View details for book with ID:', id);
    // Add your view logic here
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
        {/* Add Book Button with custom style */}
        <Button
          variant="contained"
          sx={{ backgroundColor: '#873636', color: 'white', '&:hover': { backgroundColor: '#6b2a2a' } }}
          onClick={() => console.log('Add new book')}
        >
          Add Book
        </Button>
      </Box>

      {/* DataGrid with expanded height */}
      <div style={{ height: '60vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5} // Control the number of rows per page
          rowsPerPageOptions={[5, 10, 25]}
          pagination
          rowHeight={160} // Adjust row height to accommodate the larger image height
        />
      </div>
    </Box>
  );
}