import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { BrowserMultiFormatReader } from '@zxing/library'; // Import ZXing for QR scanning

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

  const handleUserScan = (data) => {
    if (data) {
      setScannedUser(dummyUserProfile); 
      setIsScanningUser(false);
    }
  };

  const handleBookScan = (data) => {
    if (data) {
      const book = dummyBooks.find((b) => b.id === data && b.status === 'Available');
      if (book) {
        setScannedBooks((prevBooks) => [...prevBooks, book]);
        book.status = 'Borrowed';
      } else {
        alert('Book is either not available or already borrowed.');
      }
      setIsScanningBook(false);
    }
  };

  const generateTransactionId = () => {
    setTransactionId(`TXN${Date.now()}`);
  };

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

  const handleCloseSuccessPopup = () => {
    setScannedUser(null);
    setScannedBooks([]);
    setDueDate('');
    setTransactionId('');
    setSuccessPopup(false);
  };

  const handleRemoveBook = (bookId) => {
    setScannedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    const book = dummyBooks.find((b) => b.id === bookId);
    if (book) {
      book.status = 'Available';
    }
  };

  const startScanning = (isUser) => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.decodeFromInputVideoDevice(null, 'video').then((result) => {
      if (isUser) {
        handleUserScan(result.getText());
      } else {
        handleBookScan(result.getText());
      }
    }).catch((err) => {
      console.error('QR Scan error:', err);
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom color="#873636">
        Borrowing Page
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: '#873636',
          color: '#FFB397',
          '&:hover': { backgroundColor: '#6b2a2a' },
          mb: 2,
        }}
        onClick={() => {
          setIsScanningUser(true);
          startScanning(true);
        }}
      >
        Scan User QR Code
      </Button>
      {isScanningUser && (
        <Box mb={2}>
          <video id="video" width="100%" />
        </Box>
      )}
      {scannedUser && (
        <Box mb={3}>
          <Typography variant="h6">User Profile:</Typography>
          <Typography>ID: {scannedUser.id}</Typography>
          <Typography>Name: {scannedUser.name}</Typography>
          <Typography>Membership: {scannedUser.membership}</Typography>
        </Box>
      )}

      <Button
        variant="contained"
        sx={{
          backgroundColor: '#873636',
          color: '#FFB397',
          '&:hover': { backgroundColor: '#6b2a2a' },
          mb: 2,
        }}
        onClick={() => {
          setIsScanningBook(true);
          startScanning(false);
        }}
      >
        Scan Book QR Code
      </Button>
      {isScanningBook && (
        <Box mb={2}>
          <video id="video" width="100%" />
        </Box>
      )}
      {scannedBooks.length > 0 && (
        <div>
          {scannedBooks.map((book) => (
            <div key={book.id}>
              <Typography variant="body1">{book.name}</Typography>
              <Button onClick={() => handleRemoveBook(book.id)}>Remove</Button>
            </div>
          ))}
        </div>
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
        sx={{
          backgroundColor: '#873636',
          color: '#FFB397',
          '&:hover': { backgroundColor: '#6b2a2a' },
          mb: 2,
        }}
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
        sx={{
          backgroundColor: '#873636',
          color: '#FFB397',
          '&:hover': { backgroundColor: '#6b2a2a' },
        }}
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