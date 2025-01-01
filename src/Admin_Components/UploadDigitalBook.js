import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = ['Educational', 'Programming', 'Technical', 'Fiction', 'Non-Fiction']; // Dummy categories

export default function UploadDigitalBook() {
  const [bookDetails, setBookDetails] = useState({
    name: '',
    category: '',
    language: '',
    uploadDate: new Date().toISOString().split('T')[0], // Today's date
    description: '',
    file: null,
  });
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setBookDetails({ ...bookDetails, file });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!bookDetails.name || !bookDetails.category || !bookDetails.language || !bookDetails.file) {
      setErrorPopup(true);
    } else {
      console.log('Book details:', bookDetails); // Replace with backend API call
      setSuccessPopup(true);
    }
  };

  // Handle navigation back to inventory
  const handleSuccessClose = () => {
    setSuccessPopup(false);
    navigate('/digital-books');
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h4" gutterBottom color="#873636">
        Upload Digital Book
      </Typography>

      {/* Form */}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          name="name"
          value={bookDetails.name}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={bookDetails.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Language"
          name="language"
          value={bookDetails.language}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Upload Date"
          name="uploadDate"
          value={bookDetails.uploadDate}
          disabled
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={bookDetails.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <Button
          variant="outlined"
          component="label"
          sx={{ width: 'fit-content', backgroundColor: '#FFB397', color: '#873636', '&:hover': { backgroundColor: '#FFC6A0' } }}
        >
          Upload PDF
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
        {bookDetails.file && (
          <Typography variant="body2" color="green">
            {bookDetails.file.name} uploaded successfully.
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#873636', color: '#FFB397', '&:hover': { backgroundColor: '#6b2a2a' } }}
        >
          Submit
        </Button>
      </Box>

      {/* Success Popup */}
      <Dialog open={successPopup} onClose={handleSuccessClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Digital book uploaded successfully!</DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessClose}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Error Popup */}
      <Dialog open={errorPopup} onClose={() => setErrorPopup(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>All fields are required, and a file must be uploaded.</DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorPopup(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}