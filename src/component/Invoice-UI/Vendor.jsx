import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Vendor = () => {
  const navigate = useNavigate(); // Initialize navigate

  const initialInvoiceData = {
    name: "",
    address: "",
    gstin: "",
    state: "",
    district: "",
    mobilenumber: "",
    emailId: "",
    pincode: "", // New pincode field
  };

  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

  const [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    const storedDataVendor = JSON.parse(localStorage.getItem("savedInvoices"));
    if (storedDataVendor) {
      setVendorData(storedDataVendor);
    }
  }, []);

  // Store vendor data
  const vendorDataStore = () => {
    localStorage.setItem('vendorData', JSON.stringify(invoiceData));
  }

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Save button click
  const handleSave = () => {
    const updatedSavedData = [...vendorData, { ...invoiceData }];
    setVendorData(updatedSavedData);
    localStorage.setItem("savedInvoices", JSON.stringify(updatedSavedData)); // Store in localStorage
  };

  // Handle loading saved data into the form
  const handleLoadData = (data) => {
    setInvoiceData(data);
  };

  // Handle Clear button click
  const handleClear = () => {
    setInvoiceData(initialInvoiceData); // Reset to initial values
  };

  // Handle deleting a saved invoice
  const handleDelete = (index) => {
    const updatedSavedData = vendorData.filter((_, i) => i !== index);
    setVendorData(updatedSavedData);
    localStorage.setItem("savedInvoices", JSON.stringify(updatedSavedData)); // Update localStorage
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh" 
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, margin: 3, width: "100%", maxWidth: "900px" }}>
       

        {/* Form Section */}
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Vendor Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bill To Name"
                name="name"
                value={invoiceData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bill To Address"
                name="address"
                value={invoiceData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bill To GSTIN"
                name="gstin"
                value={invoiceData.gstin}
                onChange={handleInputChange}
              />
            </Grid>

            {/* New fields for State, District, Mobile Number, Email ID, and Pincode */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={invoiceData.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                name="district"
                value={invoiceData.district}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobilenumber"
                value={invoiceData.mobilenumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email ID"
                name="emailId"
                value={invoiceData.emailId}
                onChange={handleInputChange}
              />
            </Grid>

            {/* New Pincode Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={invoiceData.pincode}
                onChange={handleInputChange}
                type="number"
                inputProps={{ min: 0 }} // Ensuring positive numbers
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save Information
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
           variant="contained"
        color="success"
            sx={{ mt: 2, ml: 2 }}
            onClick={vendorDataStore}
          >
            Update Invoice
          </Button>
          <Button
            variant="contained"
        color="secondary"
          sx={{ mt: 2, ml: 2  }}
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
          {vendorData.length === 0 ? (
            <Typography variant="body2">No saved information yet.</Typography>
          ) : (
            <Grid container spacing={2}>
              {vendorData.map((data, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      padding: 2,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={() => handleLoadData(data)}
                  >
                    <div>
                      <Typography variant="body1">
                        <strong>Bill To Name:</strong> {data.name}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Address:</strong> {data.address}
                      </Typography>
                      <Typography variant="body1">
                        <strong>GSTIN:</strong> {data.gstin}
                      </Typography>
                      <Typography variant="body1">
                        <strong>State:</strong> {data.state}
                      </Typography>
                      <Typography variant="body1">
                        <strong>District:</strong> {data.district}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Mobile:</strong> {data.mobilenumber}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Email:</strong> {data.emailId}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Pincode:</strong> {data.pincode}
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

export default Vendor;
