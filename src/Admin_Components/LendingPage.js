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
  Alert,
} from '@mui/material';

const dummyUserDetails = {
  id: 'U12345',
  name: 'John Doe',
  overdueBooks: 0,
  lentBooks: 3,
};

const dummyBorrowedBooks = [
  { id: 'B101', name: 'Clean Code', dueDate: '2024-01-10', status: 'Borrowed' },
  { id: 'B102', name: 'The Pragmatic Programmer', dueDate: '2024-01-15', status: 'Borrowed' },
  { id: 'B103', name: 'Refactoring', dueDate: '2024-01-20', status: 'Borrowed' },
];

export default function LendingPage() {
  const [userId, setUserId] = useState('');
  const [scannedUser, setScannedUser] = useState(null);
  const [bookId, setBookId] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState(dummyBorrowedBooks);

  const handleScanUser = () => {
    // Simulate scanning user ID
    setScannedUser(dummyUserDetails);
  };

  const handleManualUserEntry = () => {
    // Simulate fetching user details based on entered user ID
    if (userId) {
      setScannedUser(dummyUserDetails);
    } else {
      alert('Please enter a valid User ID.');
    }
  };

  const handleScanBook = () => {
    // Simulate scanning a book ID
    alert('Book ID scanned.');
  };

  const handleManualBookEntry = () => {
    if (bookId) {
      alert(`Book ID ${bookId} entered.`);
    } else {
      alert('Please enter a valid Book ID.');
    }
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h4" gutterBottom color="#873636">
        Lending Page
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
          <Typography>Number of Overdue Books: {scannedUser.overdueBooks}</Typography>
          <Typography>Number of Lent Books: {scannedUser.lentBooks}</Typography>
          {scannedUser.overdueBooks > 0 || scannedUser.lentBooks >= 6 ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              User cannot borrow more books until overdue books are returned or lent books are below 6.
            </Alert>
          ) : (
            <Alert severity="success" sx={{ mt: 2 }}>
              User is eligible to borrow books.
            </Alert>
          )}
        </Box>
      )}

      {/* Borrowed Books Table */}
      {scannedUser && borrowedBooks.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#873636' }}>
              <TableRow>
                <TableCell sx={{ color: '#FFB397' }}>Book ID</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Name</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Due Date</TableCell>
                <TableCell sx={{ color: '#FFB397' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowedBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.name}</TableCell>
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
      {scannedUser && scannedUser.overdueBooks === 0 && scannedUser.lentBooks < 6 && (
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' }, mr: 2 }}
            onClick={handleScanBook}
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
    </Box>
  );
}