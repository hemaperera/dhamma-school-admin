import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Html5QrcodeScanner } from 'html5-qrcode';

const dummyBooks = [
  { id: 'B101', name: 'Clean Code', status: 'Available' },
  { id: 'B102', name: 'The Pragmatic Programmer', status: 'Available' },
  { id: 'B103', name: 'Refactoring', status: 'Borrowed' },
];

const dummyUserProfile = {
  id: 'U12345',
  name: 'John Doe',
  membership: 'Gold Member',
};

export default function BorrowingPage() {
  const [scannedUser, setScannedUser] = useState(null);
  const [scannedBooks, setScannedBooks] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [isScanningUser, setIsScanningUser] = useState(false);
  const [isScanningBook, setIsScanningBook] = useState(false);

  // Initialize QR scanner
  const initializeScanner = (elementId, onScanSuccess) => {
    const scanner = new Html5QrcodeScanner(
      elementId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
    );
    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear();
      },
      (error) => console.error('QR Code Scan Error:', error),
    );
  };

  // Start user QR code scanning
  useEffect(() => {
    if (isScanningUser) {
      initializeScanner('user-reader', (decodedText) => {
        setScannedUser(dummyUserProfile);
        setIsScanningUser(false);
      });
    }
  }, [isScanningUser]);

  // Start book QR code scanning
  useEffect(() => {
    if (isScanningBook) {
      initializeScanner('book-reader', (decodedText) => {
        const book = dummyBooks.find((b) => b.id === decodedText && b.status === 'Available');
        if (book) {
          setScannedBooks((prevBooks) => [...prevBooks, book]);
          book.status = 'Borrowed';
        } else {
          alert('Book is either not available or already borrowed.');
        }
        setIsScanningBook(false);
      });
    }
  }, [isScanningBook]);

  // Generate a unique transaction ID
  const generateTransactionId = () => {
    setTransactionId(`TXN${Date.now()}`);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!scannedUser || scannedBooks.length === 0 || !dueDate) {
      alert('Please complete all required fields before submitting.');
      return;
    }
    console.log('Transaction Details:', {
      user: scannedUser,
      books: scannedBooks,
      dueDate,
      transactionId,
    });
    setSuccessPopup(true);
  };

  // Handle close success popup
  const handleCloseSuccessPopup = () => {
    setScannedUser(null);
    setScannedBooks([]);
    setDueDate('');
    setTransactionId('');
    setSuccessPopup(false);
  };

  // Remove book from scanned list
  const handleRemoveBook = (bookId) => {
    setScannedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    const book = dummyBooks.find((b) => b.id === bookId);
    if (book) {
      book.status = 'Available';
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom color="#873636">
        Borrowing Page
      </Typography>

      {/* Scan User QR */}
      <Button
        variant="contained"
        sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' }, mb: 2 }}
        onClick={() => setIsScanningUser(true)}
      >
        Scan User QR Code
      </Button>
      {isScanningUser && <div id="user-reader" style={{ marginBottom: '20px' }} />}
      {scannedUser && (
        <Box mb={3}>
          <Typography variant="h6">User Profile:</Typography>
          <Typography>ID: {scannedUser.id}</Typography>
          <Typography>Name: {scannedUser.name}</Typography>
          <Typography>Membership: {scannedUser.membership}</Typography>
        </Box>
      )}

      {/* Scan Book QR */}
      <Button
        variant="contained"
        sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' }, mb: 2 }}
        onClick={() => setIsScanningBook(true)}
      >
        Scan Book QR Code
      </Button>
      {isScanningBook && <div id="book-reader" style={{ marginBottom: '20px' }} />}
      {scannedBooks.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#873636' }}>
              <TableRow>
                <TableCell sx={{ color: '#FFB397' }}>Book ID</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Name</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Status</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scannedBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => handleRemoveBook(book.id)}
                      sx={{ color: '#873636', '&:hover': { color: '#6b2a2a' } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        sx={{ mb: 3 }}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' }, mb: 2 }}
        onClick={generateTransactionId}
      >
        Generate Transaction ID
      </Button>
      {transactionId && (
        <Typography variant="body1" sx={{ mb: 3 }}>
          Transaction ID: {transactionId}
        </Typography>
      )}

      <Button
        variant="contained"
        sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Dialog open={successPopup} onClose={handleCloseSuccessPopup}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Books borrowed successfully!</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessPopup}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}