import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';

const EditBookDetails = ({ open, handleClose, bookDetails, handleSave }) => {
  // State to manage form fields
  const [editedBook, setEditedBook] = useState(bookDetails);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  // Handle save button
  const handleSaveClick = () => {
    handleSave(editedBook); // Pass updated book details to parent
    handleClose();
  };

  if (!editedBook) return null; // Ensure editedBook is available before rendering

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {/* Title */}
      <DialogTitle sx={{ backgroundColor: '#873636', color: '#FFB397', textAlign: 'center' }}>
        Edit Book Details - {editedBook.name}
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        {/* Form Fields */}
        <Box display="flex" flexDirection="column" gap={2}>
            <TextField
                label="Book ID"
                name="id"
                value={editedBook.id}
                onChange={handleChange}
                fullWidth
                disabled
                sx={{ mt: 2 }} // Add margin-top
            />
            <TextField
                label="Name"
                name="name"
                value={editedBook.name}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Category"
                name="category"
                value={editedBook.category}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Language"
                name="language"
                value={editedBook.language}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Author(s)"
                name="authors"
                value={editedBook.authors}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Location (Floor, Shelf, Row)"
                name="location"
                value={editedBook.location}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Description"
                name="description"
                value={editedBook.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
            />
            
            </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveClick}
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookDetails;