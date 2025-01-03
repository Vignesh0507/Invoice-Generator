import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BankDetailsForm = () => {
  const navigate = useNavigate();

  // Initial form data structure
  const initialBankData = {
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
  };

  // State to hold form data
  const [bankData, setBankData] = useState(initialBankData);

  // State for saved data
  const [savedBankData, setSavedBankData] = useState([]);

  // Retrieve saved data from localStorage when the component mounts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('savedBankDetails'));
    if (storedData) {
      setSavedBankData(storedData);
    }
  }, []);
  const handleBankDetails = () => {
    localStorage.setItem('bankData', JSON.stringify(bankData));
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the Save button click
  const handleSave = () => {
    const updatedSavedBankData = [...savedBankData, { ...bankData }];
    setSavedBankData(updatedSavedBankData);
    localStorage.setItem('savedBankDetails', JSON.stringify(updatedSavedBankData)); // Store in localStorage
    setBankData(initialBankData); // Reset form after saving
  };

  // Handle the Clear button click
  const handleClear = () => {
    setBankData(initialBankData); // Reset to initial values
  };

  // Handle deleting a saved bank detail
  const handleDelete = (index) => {
    const updatedSavedBankData = savedBankData.filter((_, i) => i !== index);
    setSavedBankData(updatedSavedBankData);
    localStorage.setItem('savedBankDetails', JSON.stringify(updatedSavedBankData)); // Update localStorage
  };

  // Handle loading the saved bank data into the form
  const handleLoadData = (data) => {
    setBankData(data);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 3, maxWidth: '900px' }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        Back
      </Button>

      {/* Form Section */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Enter Bank Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Account Name"
              name="accountName"
              value={bankData.accountName}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Account Number"
              name="accountNumber"
              value={bankData.accountNumber}
              onChange={handleInputChange}
              variant="outlined"
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bankName"
              value={bankData.bankName}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="IFSC Code"
              name="ifscCode"
              value={bankData.ifscCode}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSave}
        >
          Save Bank Details
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 2, ml: 2 }}
          onClick={handleClear}
        >
          Clear Form
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 2, ml: 2 }}
          onClick={handleBankDetails}
        >
          Update Invoice
        </Button>
      </Box>

      {/* Saved Bank Details Section */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Saved Bank Details:
        </Typography>
        {savedBankData.length === 0 ? (
          <Typography variant="body2">No saved bank details yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {savedBankData.map((data, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleLoadData(data)} // Load data into form when clicked
                >
                  <div>
                    <Typography variant="body1">
                      <strong>Account Name:</strong> {data.accountName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Account Number:</strong> {data.accountNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Bank Name:</strong> {data.bankName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>IFSC Code:</strong> {data.ifscCode}
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
  );
};

export default BankDetailsForm;
