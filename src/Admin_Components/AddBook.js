import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = ['Educational', 'Programming', 'Technical', 'Fiction', 'Non-Fiction']; // Dummy categories

export default function AddBook() {
  const navigate = useNavigate();

  // State Variables
  const [bookDetails, setBookDetails] = useState({
    id: '',
    name: '',
    category: '',
    language: '',
    authors: '',
    location: '',
    description: '',
    dateEntered: '',
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [popupOpen, setPopupOpen] = useState(false); // Success/Failure Popup
  const [isSuccess, setIsSuccess] = useState(false); // Track form submission status

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  // Handle Form Submission
  const handleSubmit = () => {
    // Simulate form validation and backend submission
    if (bookDetails.name && bookDetails.category && imagePreview) {
      setIsSuccess(true); // Simulate a successful submission
    } else {
      setIsSuccess(false); // Simulate a failure
    }
    setPopupOpen(true); // Open the popup
  };

  // Handle Popup Close
  const handlePopupClose = () => {
    setPopupOpen(false);
    if (isSuccess) {
      navigate('/BookMgt'); // Redirect to BookManagement page after success
    }
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h4" gutterBottom color="#873636">
        Add New Book
      </Typography>

      {/* Form Fields */}
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Book ID */}
        <TextField
          label="Book ID"
          name="id"
          value={bookDetails.id}
          onChange={handleChange}
          fullWidth
        />
        {/* Book Name */}
        <TextField
          label="Name"
          name="name"
          value={bookDetails.name}
          onChange={handleChange}
          fullWidth
        />
        {/* Category Dropdown */}
        <Autocomplete
          options={categories}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="Category" fullWidth />
          )}
          value={bookDetails.category}
          onChange={(e, value) => setBookDetails({ ...bookDetails, category: value })}
        />
        {/* Language */}
        <TextField
          label="Language"
          name="language"
          value={bookDetails.language}
          onChange={handleChange}
          fullWidth
        />
        {/* Authors */}
        <TextField
          label="Author(s)"
          name="authors"
          value={bookDetails.authors}
          onChange={handleChange}
          fullWidth
        />
        {/* Location */}
        <TextField
          label="Location (Floor, Shelf, Row)"
          name="location"
          value={bookDetails.location}
          onChange={handleChange}
          fullWidth
        />
        {/* Description */}
        <TextField
          label="Description"
          name="description"
          value={bookDetails.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
        {/* Date Entered */}
        <TextField
          label="Date Entered"
          name="dateEntered"
          value={bookDetails.dateEntered}
          onChange={handleChange}
          fullWidth
        />
        {/* Image Upload */}
        <Box>
          <Button variant="contained" component="label" sx={{ backgroundColor: '#873636', color: 'white', '&:hover': { backgroundColor: '#6b2a2a' } }}>
            Upload Image
            <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
          </Button>
          {imagePreview && (
            <Box mt={2}>
              <img src={imagePreview} alt="Book Cover Preview" style={{ width: '150px', height: '200px', objectFit: 'cover' }} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Submit Button */}
      <Box mt={3}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#873636', color: 'white', '&:hover': { backgroundColor: '#6b2a2a' } }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>

      {/* Success/Failure Popup */}
      <Dialog open={popupOpen} onClose={handlePopupClose}>
        <DialogTitle sx={{ backgroundColor: isSuccess ? '#4CAF50' : '#F44336', color: 'white', textAlign: 'center' }}>
          {isSuccess ? 'Success!' : 'Error'}
        </DialogTitle>
        <DialogContent>
          {isSuccess
            ? 'The book has been successfully added.'
            : 'Failed to add the book. Please ensure all fields are filled out correctly.'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose} sx={{ color: isSuccess ? '#4CAF50' : '#F44336' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}