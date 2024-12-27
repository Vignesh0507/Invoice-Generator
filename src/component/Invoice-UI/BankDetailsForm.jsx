import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Helper function to validate DD/MM/YYYY format
const isValidDDMMYYYY = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(date);
};

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
  const [errors, setErrors] = useState({ invoiceDate: '', refDate: '' });

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

    // Clear errors on input change
    if (name === 'invoiceDate' || name === 'refDate') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidDDMMYYYY(value) ? '' : 'Invalid date format (DD/MM/YYYY)',
      }));
    }
  };

  // Handle the Save button click
  const handleSave = () => {
    if (!isValidDDMMYYYY(invoiceData.invoiceDate) || !isValidDDMMYYYY(invoiceData.refDate)) {
      setErrors({
        invoiceDate: !isValidDDMMYYYY(invoiceData.invoiceDate) ? 'Invalid date format (DD/MM/YYYY)' : '',
        refDate: !isValidDDMMYYYY(invoiceData.refDate) ? 'Invalid date format (DD/MM/YYYY)' : '',
      });
      return;
    }

    const updatedSavedInvoiceData = [...savedInvoiceData, { ...invoiceData }];
    setSavedInvoiceData(updatedSavedInvoiceData);
    localStorage.setItem('savedInvoiceDetails', JSON.stringify(updatedSavedInvoiceData)); // Store in localStorage
    setInvoiceData(initialInvoiceData); // Reset form after saving
  };

  // Handle the Clear button click
  const handleClear = () => {
    setInvoiceData(initialInvoiceData); // Reset to initial values
    setErrors({}); // Clear errors
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
    <Paper elevation={3} sx={{
      padding: 4,
      margin: 'auto',
      mt:3,
      maxWidth: '700px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>

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
              required
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
              required
              placeholder="DD/MM/YYYY"
              error={Boolean(errors.invoiceDate)}
              helperText={errors.invoiceDate}
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
              required
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
              required
              placeholder="DD/MM/YYYY"
              error={Boolean(errors.refDate)}
              helperText={errors.refDate}
            />
          </Grid>
        </Grid>

        <Box mt={2} sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: { xs: '100%', sm: '20%' } }}
            onClick={handleSave}
          >
            Save Invoice
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: { xs: '100%', sm: '20%' } }}
            onClick={handleClear}
          >
            Clear Form
          </Button>
          <Button
            variant="contained"
        color="success"
            sx={{ width: { xs: '100%', sm: '25%' } }}
            onClick={handleInvoiceDateSave}
          >
            update invoice
          </Button>
        </Box>

        {/* Back Button */}
        <Button
            variant="contained"
        color="secondary"
          sx={{ mt: 2}}
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
  );
};

export default InvoiceDetailsForm;
