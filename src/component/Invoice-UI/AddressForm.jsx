import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddressForm = () => {
  const navigate = useNavigate(); 

  const initialAddressData = {
    companyName: '',
    address: '',
    state: '',
    district: '',
    pincode: '',
    email: '',
    mobileNumber: '',
    gstin: '',
  };

  const [addressData, setAddressData] = useState(initialAddressData);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('savedAddresses'));
    if (storedData) {
      setSavedData(storedData);
    }
  }, []);

  // Add address data to localStorage
  const handleAddAddress = () => {
    localStorage.setItem('addressData', JSON.stringify(addressData));
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the Save button click
  const handleSave = () => {
    const updatedSavedData = [...savedData, { ...addressData }];
    setSavedData(updatedSavedData);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedSavedData)); // Store in localStorage
  };

  // Handle loading saved data into the form
  const handleLoadData = (data) => {
    setAddressData(data);
  };

  // Handle the Clear button click
  const handleClear = () => {
    setAddressData(initialAddressData); // Reset to initial values
  };

  // Handle deleting a saved address
  const handleDelete = (index) => {
    const updatedSavedData = savedData.filter((_, i) => i !== index);
    setSavedData(updatedSavedData);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedSavedData)); // Update localStorage
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5', padding: 2 }}
    >
      <Paper elevation={3} sx={{ padding: 3, margin: 3, maxWidth: '900px', width: '100%' }}>
        {/* Form Section */}
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Enter Company Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={addressData.companyName}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={addressData.address}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={addressData.state}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                name="district"
                value={addressData.district}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={addressData.pincode}
                onChange={handleInputChange}
                variant="outlined"
                required
                type="number"
                inputProps={{ min: 0 }} // Ensuring positive numbers
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={addressData.email}
                onChange={handleInputChange}
                variant="outlined"
                required
                type="email"
                inputProps={{
                  pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                }} // Email validation
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={addressData.mobileNumber}
                onChange={handleInputChange}
                variant="outlined"
                required
                type="tel"
                inputProps={{
                  pattern: '[0-9]*', // Allow only numbers
                  maxLength: 10, // Mobile number validation (assuming 10 digits)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GSTIN"
                name="gstin"
                value={addressData.gstin}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ width: '12rem', marginRight: 2 }}
            >
              Save Information
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
              sx={{ width: '12rem', marginRight: 2 }}
            >
              Clear Form
            </Button>
            <Button
             variant="contained"
        color="success"
              onClick={handleAddAddress}
              sx={{ width: '12rem'}}
            >
           update invoice
            </Button>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button
              variant="contained"
        color="secondary"
            sx={{ marginBottom: 2 }}
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </Button>
        </Box>

        {/* Saved Information Section */}
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Saved Information:
          </Typography>
          {savedData.length === 0 ? (
            <Typography variant="body2">No saved information yet.</Typography>
          ) : (
            <Grid container spacing={2}>
              {savedData.map((data, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      padding: 2,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    onClick={() => handleLoadData(data)}
                  >
                    <div>
                      <Typography variant="body1">
                        <strong>Company Name:</strong> {data.companyName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Address:</strong> {data.address}
                      </Typography>
                      <Typography variant="body1">
                        <strong>State:</strong> {data.state}
                      </Typography>
                      <Typography variant="body1">
                        <strong>District:</strong> {data.district}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Mobile:</strong> {data.mobileNumber}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Email:</strong> {data.email}
                      </Typography>
                    </div>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the onClick from triggering the form load
                        handleDelete(index); // Delete the saved item
                      }}
                    >
                      Delete
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AddressForm;
