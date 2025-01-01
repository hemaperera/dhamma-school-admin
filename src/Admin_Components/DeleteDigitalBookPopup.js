import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const DeleteDigitalBookPopup = ({ open, handleClose, bookDetails, handleDelete }) => {
  if (!bookDetails) return null; // Guard clause

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {/* Title */}
      <DialogTitle sx={{ backgroundColor: '#873636', color: '#FFB397', textAlign: 'center' }}>
        Confirm Deletion
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the digital book <b>{bookDetails.name}</b>?
        </Typography>
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
          onClick={() => handleDelete(bookDetails.id)}
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDigitalBookPopup;