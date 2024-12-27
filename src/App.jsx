import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddressForm from './component/Invoice-UI/AddressForm';
import Vendor from './component/Invoice-UI/Vendor';
import InvoiceComponent from './component/Invoice-UI/InvoiceComponent';
import BankDetailsForm from './component/Invoice-UI/BankDetailsForm';
import InvoiceDetailsForm from './component/Invoice-UI/InvoiceDetailsForm';
import BrandBusinessForm from './component/Invoice-UI/BrandBusinessForm';
import InvoiceTemplate from './component/Templete/InvoiceTemplate';
import { Container, Grid, Button, Typography, AppBar, Toolbar, Box } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Invoice Generator
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Sidebar links for navigation */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button component={Link} to="/company-info" variant="outlined" sx={{ mb: 2, width: '100%' }}>
                Company Information
              </Button>
              <Button component={Link} to="/vendor-info" variant="outlined" sx={{ mb: 2, width: '100%' }}>
                Vendor Information
              </Button>
              <Button component={Link} to="/bank-info" variant="outlined" sx={{ mb: 2, width: '100%' }}>
                Bank Information
              </Button>
              <Button component={Link} to="/invoice-info" variant="outlined" sx={{ mb: 2, width: '100%' }}>
                Invoice Information
              </Button>
              <Button component={Link} to="/Brand-info" variant="outlined" sx={{ mb: 2, width: '100%' }}>
                Brand Information
              </Button>
              <Button component={Link} to="/Rate-info" variant="outlined" sx={{ mb: 2, width: '100%' }}>
                Rate Information
              </Button>
              <Button component={Link} to="/pdf-info" variant="outlined" sx={{ mb: 2, width: '100%' }}>
                Generate Invoice
              </Button>
            </Box>
          </Grid>

          {/* Main content */}
          <Grid item xs={12} md={8}>
            <Routes>
              <Route path="/company-info" element={<AddressForm />} />
              <Route path="/vendor-info" element={<Vendor />} />
              <Route path="/bank-info" element={<BankDetailsForm />} />
              <Route path="/invoice-info" element={<InvoiceDetailsForm />} />
              <Route path="/Brand-info" element={<BrandBusinessForm />} />
              <Route path="/Rate-info" element={<InvoiceComponent />} />
              <Route path="/pdf-info" element={<InvoiceTemplate />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
};

export default App;
