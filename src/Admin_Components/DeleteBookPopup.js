import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteBookPopup = ({ open, handleClose, bookDetails, handleDelete }) => {
  if (!bookDetails) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: '#873636', color: '#FFB397', textAlign: 'center' }}>
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the book <b>{bookDetails.name}</b> (ID: {bookDetails.id})?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDelete(bookDetails.id);
            handleClose();
          }}
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBookPopup;