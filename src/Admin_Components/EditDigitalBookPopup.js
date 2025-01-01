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

const EditDigitalBookPopup = ({ open, handleClose, bookDetails, handleSave }) => {
  const [editedBook, setEditedBook] = useState(bookDetails);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  // Handle save button
  const handleSaveClick = () => {
    handleSave(editedBook); // Pass updated book details to parent
    handleClose();
  };

  if (!editedBook) return null; // Guard clause

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {/* Title */}
      <DialogTitle sx={{ backgroundColor: '#873636', color: '#FFB397', textAlign: 'center' }}>
        Edit Digital Book Details
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="ID"
            name="id"
            value={editedBook.id}
            onChange={handleChange}
            fullWidth
            disabled // ID is non-editable
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
            label="Upload Date"
            name="uploadDate"
            value={editedBook.uploadDate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Download Count"
            name="downloadCount"
            value={editedBook.downloadCount}
            onChange={handleChange}
            fullWidth
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

export default EditDigitalBookPopup;