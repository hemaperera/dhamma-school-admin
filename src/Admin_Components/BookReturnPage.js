import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// Dummy Data
const dummyUserDetails = {
  id: 'U12345',
  name: 'John Doe',
  lentBooks: 2,
};

const dummyBorrowedBooks = [
  { id: 'B101', name: 'Clean Code', borrowedDate: '2023-12-10', dueDate: '2023-12-20', status: 'Borrowed' },
  { id: 'B102', name: 'The Pragmatic Programmer', borrowedDate: '2023-12-15', dueDate: '2023-12-25', status: 'Overdue' },
];

export default function BookReturningPage() {
  const [userId, setUserId] = useState('');
  const [scannedUser, setScannedUser] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnPopupOpen, setReturnPopupOpen] = useState(false);

  // Handle User Scanning
  const handleScanUser = () => {
    setScannedUser(dummyUserDetails); // Simulate fetching user details
    setBorrowedBooks(dummyBorrowedBooks); // Simulate fetching borrowed books
  };

  const handleManualUserEntry = () => {
    if (userId) {
      setScannedUser(dummyUserDetails); // Simulate fetching user details
      setBorrowedBooks(dummyBorrowedBooks); // Simulate fetching borrowed books
    } else {
      alert('Please enter a valid User ID.');
    }
  };

  // Handle Book Scanning
  const handleScanBook = (bookId) => {
    const book = borrowedBooks.find((b) => b.id === bookId && b.status === 'Borrowed');
    if (book) {
      setSelectedBook(book);
      setReturnPopupOpen(true);
    } else {
      alert('Book not found or already returned.');
    }
  };

  const handleManualBookEntry = () => {
    if (bookId) {
      handleScanBook(bookId);
    } else {
      alert('Please enter a valid Book ID.');
    }
  };

  // Handle Return Confirmation
  const handleConfirmReturn = () => {
    setBorrowedBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === selectedBook.id ? { ...b, status: 'Returned' } : b))
    );
    setReturnPopupOpen(false);
    setSelectedBook(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom color="#873636">
        Book Returning Page
      </Typography>

      {/* Scan User ID */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' }, mr: 2 }}
          onClick={handleScanUser}
        >
          Scan User ID
        </Button>
        <TextField
          label="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
          onClick={handleManualUserEntry}
        >
          Enter
        </Button>
      </Box>

      {/* User Details */}
      {scannedUser && (
        <Box mb={3} p={2} sx={{ border: '1px solid #873636', borderRadius: 2 }}>
          <Typography variant="h6">User Details</Typography>
          <Typography>ID: {scannedUser.id}</Typography>
          <Typography>Name: {scannedUser.name}</Typography>
          <Typography>Number of Lent Books: {scannedUser.lentBooks}</Typography>
        </Box>
      )}

      {/* Borrowed Books Table */}
      {borrowedBooks.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#873636' }}>
              <TableRow>
                <TableCell sx={{ color: '#FFB397' }}>Book ID</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Name</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Borrowed Date</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Due Date</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowedBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.borrowedDate}</TableCell>
                  <TableCell>{book.dueDate}</TableCell>
                  <TableCell
                    sx={{
                      color: book.status === 'Overdue' ? 'red' : 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    {book.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Scan Book ID */}
      {scannedUser && (
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' }, mr: 2 }}
            onClick={() => handleScanBook('B101')}
          >
            Scan Book ID
          </Button>
          <TextField
            label="Enter Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
            onClick={handleManualBookEntry}
          >
            Enter
          </Button>
        </Box>
      )}

      {/* Return Confirmation Popup */}
      {selectedBook && (
        <Dialog open={returnPopupOpen} onClose={() => setReturnPopupOpen(false)}>
          <DialogTitle>Confirm Return</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to mark this book as returned?</Typography>
            <Typography>ID: {selectedBook.id}</Typography>
            <Typography>Name: {selectedBook.name}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReturnPopupOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmReturn} sx={{ color: '#873636' }}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}