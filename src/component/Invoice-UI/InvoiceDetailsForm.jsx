import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InvoiceDetailsForm = () => {
  const navigate = useNavigate();

  const initialInvoiceData = {
    invoiceNo: '',
    invoiceDate: '',
    refNo: '',
    refDate: '',
  };

  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [savedInvoiceData, setSavedInvoiceData] = useState([]);

  useEffect(() => {
    const invoiceDate = JSON.parse(localStorage.getItem('savedInvoiceDetails'));
    if (invoiceDate) {
      setSavedInvoiceData(invoiceDate);
    }
  }, []);

  const handleInvoiceDateSave = () => {
    localStorage.setItem('dateData', JSON.stringify(invoiceData));
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the Save button click
  const handleSave = () => {
    const updatedSavedInvoiceData = [...savedInvoiceData, { ...invoiceData }];
    setSavedInvoiceData(updatedSavedInvoiceData);
    localStorage.setItem('savedInvoiceDetails', JSON.stringify(updatedSavedInvoiceData)); // Store in localStorage
    setInvoiceData(initialInvoiceData); // Reset form after saving
  };

  // Handle the Clear button click
  const handleClear = () => {
    setInvoiceData(initialInvoiceData); // Reset to initial values
  };

  // Handle deleting a saved invoice detail
  const handleDelete = (index) => {
    const updatedSavedInvoiceData = savedInvoiceData.filter((_, i) => i !== index);
    setSavedInvoiceData(updatedSavedInvoiceData);
    localStorage.setItem('savedInvoiceDetails', JSON.stringify(updatedSavedInvoiceData)); // Update localStorage
  };

  // Handle loading the saved invoice data into the form
  const handleLoadData = (data) => {
    setInvoiceData(data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height of the screen
        backgroundColor: '#f4f4f4', // Light background
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, margin: 3, mt: 25, maxWidth: '700px', width: '100%' }}>
        {/* Form Section */}
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Enter Invoice Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Invoice No"
                name="invoiceNo"
                value={invoiceData.invoiceNo}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Invoice Date (DD/MM/YYYY)"
                name="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={handleInputChange}
                variant="outlined"
                placeholder="DD/MM/YYYY"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ref No"
                name="refNo"
                value={invoiceData.refNo}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ref Date (DD/MM/YYYY)"
                name="refDate"
                value={invoiceData.refDate}
                onChange={handleInputChange}
                variant="outlined"
                placeholder="DD/MM/YYYY"
              />
            </Grid>
          </Grid>

          <Box mt={2} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '25%' }}
              onClick={handleSave}
            >
              Save Invoice
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ width: '20%' }}
              onClick={handleClear}
            >
              Clear Form
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ width: '25%' }}
              onClick={handleInvoiceDateSave}
            >
              Update Invoice
            </Button>
          </Box>
          {/* Back Button */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </Button>
        </Box>

        {/* Saved Invoice Details Section */}
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Saved Invoice Details:
          </Typography>
          {savedInvoiceData.length === 0 ? (
            <Typography variant="body2">No saved invoice details yet.</Typography>
          ) : (
            <Grid container spacing={2}>
              {savedInvoiceData.map((data, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      padding: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      flexDirection: 'column',
                    }}
                    onClick={() => handleLoadData(data)} // Load data into form when clicked
                  >
                    <div>
                      <Typography variant="body1">
                        <strong>Invoice No:</strong> {data.invoiceNo}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Invoice Date:</strong> {data.invoiceDate}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Ref No:</strong> {data.refNo}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Ref Date:</strong> {data.refDate}
                      </Typography>
                    </div>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
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

export default InvoiceDetailsForm;
