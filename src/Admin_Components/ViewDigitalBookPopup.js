import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const ViewDigitalBookPopup = ({ open, handleClose, bookDetails }) => {
  if (!bookDetails) return null; // Guard clause for missing book details

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {/* Title */}
      <DialogTitle sx={{ backgroundColor: '#873636', color: '#FFB397', textAlign: 'center' }}>
        View Digital Book Details
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        <Box>
          <Typography variant="body1">
            <b>ID:</b> {bookDetails.id}
          </Typography>
          <Typography variant="body1">
            <b>Name:</b> {bookDetails.name}
          </Typography>
          <Typography variant="body1">
            <b>Category:</b> {bookDetails.category}
          </Typography>
          <Typography variant="body1">
            <b>Language:</b> {bookDetails.language}
          </Typography>
          <Typography variant="body1">
            <b>Upload Date:</b> {bookDetails.uploadDate}
          </Typography>
          <Typography variant="body1">
            <b>Download Count:</b> {bookDetails.downloadCount}
          </Typography>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDigitalBookPopup;