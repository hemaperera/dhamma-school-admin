import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const BookDetailsPopup = ({ open, handleClose, bookDetails }) => {
  if (!bookDetails) return null; // Ensure bookDetails is available before rendering

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {/* Title */}
      <DialogTitle sx={{ backgroundColor: '#873636', color: '#FFB397', textAlign: 'center' }}>
        Book Details - {bookDetails.name}
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        {/* Book Information Table */}
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
          <Table>
            <TableBody>
              {/* Image Row */}
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <img
                    src={bookDetails.image}
                    alt={bookDetails.name}
                    style={{ width: 120, height: 180, objectFit: 'cover' }}
                  />
                </TableCell>
              </TableRow>
              {/* Book Details */}
              <TableRow>
                <TableCell><b>Book ID:</b></TableCell>
                <TableCell>{bookDetails.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Name:</b></TableCell>
                <TableCell>{bookDetails.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Category:</b></TableCell>
                <TableCell>{bookDetails.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Language:</b></TableCell>
                <TableCell>{bookDetails.language}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Author(s):</b></TableCell>
                <TableCell>{bookDetails.authors}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Location:</b></TableCell>
                <TableCell>{bookDetails.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Date Entered:</b></TableCell>
                <TableCell>{bookDetails.dateEntered}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Description:</b></TableCell>
                <TableCell>{bookDetails.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Additional Information */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1">
            <b>Availability:</b> {bookDetails.availability}
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

export default BookDetailsPopup;