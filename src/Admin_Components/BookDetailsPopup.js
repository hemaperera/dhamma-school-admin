import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Sample book details data (used for demonstration)
const sampleBooksData = [
  { id: 'B101', name: 'Learn React', category: 'Programming', language: 'English', image: 'https://via.placeholder.com/50' },
  { id: 'B102', name: 'Node.js Basics', category: 'Web Development', language: 'English', image: 'https://via.placeholder.com/50' },
  { id: 'B103', name: 'Material UI', category: 'Design', language: 'English', image: 'https://via.placeholder.com/50' },
];

const BookDetailsPopup = ({ open, handleClose, transactionDetails }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {/* Title */}
      <DialogTitle sx={{ backgroundColor: '#873636', color: '#FFB397' }}>
        Book Borrowing Details - {transactionDetails.name}
      </DialogTitle>

      {/* Content */}
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell><b>Book ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Language</b></TableCell>
                <TableCell><b>Image</b></TableCell>
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {sampleBooksData.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.language}</TableCell>
                  <TableCell>
                    <img src={book.image} alt={book.name} style={{ width: 50, height: 50 }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary */}
        <Box sx={{ marginTop: 2 }}>
          <p><b>Total Number of Books:</b> {sampleBooksData.length}</p>
          <p><b>Return Date:</b> {transactionDetails.dueDate}</p>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button onClick={handleClose} sx={{ backgroundColor: '#873636', color: '#FFB397' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDetailsPopup;