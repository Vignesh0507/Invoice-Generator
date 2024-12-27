import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BrandBusinessForm = () => {
  const navigate = useNavigate();

  const initialFormData = {
    brandName: 'PRATHI DÉCOR',
    businessType: 'Proprietor',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('savedBrandBusinessData'));
    if (storedData) {
      setSavedData(storedData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedSavedData = [...savedData, { ...formData }];
    setSavedData(updatedSavedData);
    localStorage.setItem('savedBrandBusinessData', JSON.stringify(updatedSavedData));
  };

  const handleClear = () => {
    setFormData({
      brandName: '',
      businessType: '',
    });
  };

  const handleAddBrand = () => {
    localStorage.setItem('brand', JSON.stringify(formData));
  };

  const handleLoadData = (data) => {
    setFormData(data);
  };

  const handleDelete = (index) => {
    const updatedSavedData = savedData.filter((_, i) => i !== index);
    setSavedData(updatedSavedData);
    localStorage.setItem('savedBrandBusinessData', JSON.stringify(updatedSavedData));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
        mt:1
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          margin: 3,
          maxWidth: '600px',
          width: '100%',
        }}
      >
        {/* Form Section */}
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Enter Brand and Business Information
          </Typography>
          <br/>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand Name"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business Type"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
          <Box mt={2} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <Button variant="contained" color="primary" sx={{ flex: 1 }} onClick={handleSave}>
              Save Data
            </Button>
            <Button variant="outlined" color="secondary" sx={{ flex: 1 }} onClick={handleClear}>
              Clear Form
            </Button>
            <Button variant="contained"
        color="success" sx={{ flex: 1 }} onClick={handleAddBrand}>
              update invoice
            </Button>
          </Box>
        </Box>

        {/* Back Button */}
        <Box mt={3}>
          <Button
             variant="contained"
        color="secondary"
           
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>

        {/* Saved Data Section */}
        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Saved Data:
          </Typography>
          {savedData.length === 0 ? (
            <Typography variant="body2">No saved data yet.</Typography>
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
                        <strong>Brand Name:</strong> {data.brandName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Business Type:</strong> {data.businessType}
                      </Typography>
                    </div>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
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

export default BrandBusinessForm;
