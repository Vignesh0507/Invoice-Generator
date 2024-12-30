import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
} from '@mui/material';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const InvoiceTemplate = ({ savedData, onDone }) => {
  const [formData, setFormData] = useState({});
  const [vendor, setVendor] = useState({});
  const [date, setDate] = useState({});
  const [bank, setBank] = useState({});
  const [brand, setBrand] = useState({});
  const [amount, setAmount] = useState([]);

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const address = JSON.parse(localStorage.getItem('addressData')) || {};
    setFormData(address);

    const vendorDetails = JSON.parse(localStorage.getItem('vendorData')) || {};
    setVendor(vendorDetails);

    const invoiceDateDetails = JSON.parse(localStorage.getItem('dateData')) || {};
    setDate(invoiceDateDetails);

    const bankDetails = JSON.parse(localStorage.getItem('bankData')) || {};
    setBank(bankDetails);

    const brandDetails = JSON.parse(localStorage.getItem('brand')) || {};
    setBrand(brandDetails);
    const itemDetails = JSON.parse(localStorage.getItem('invoiceData')) || {};
    setAmount(itemDetails);
    console.log(itemDetails);
  }, [savedData]);

  const handleDone = () => {
    if (onDone) {
      onDone({ formData, vendor, date, bank, brand, invoiceData });
    }
  };

  const handleDownload = () => {
    const element = document.getElementById('invoice-content');
    const options = {
      filename: 'invoice.pdf',
      margin: 10,
      html2canvas: {
        scale: 3,
        dpi: 300,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
    };
    html2pdf().from(element).set(options).save();
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      <Container
        id="invoice-content"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          px: 2,
          overflowX: 'hidden', // Prevent horizontal scroll on mobile
        }}
      >
        <h2>Tax Invoice</h2>
        <Box
          sx={{
            width: '100%',
            maxWidth: '700px',
            border: '2px solid black',
            p: { xs: 1, sm: 2 }, // Adjust padding for smaller screens
          }}
        >
          {/* Header Section */}
          <Grid
            container
            sx={{
              borderBottom: '2px solid black',
              flexDirection: { xs: 'column', sm: 'row' }, // Stacks on mobile
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                borderRight: { xs: 'none', sm: '2px solid black' },
                p: { xs: 1, sm: 2 },
              }}
            >
              <Typography variant="body1">
                <strong>{formData.companyName || 'PRATHI DÉCOR'}</strong>
              </Typography>
              <Typography variant="body2">
                {formData.address || '237A, 7th Street, Sempon Nagar, Perungudi,'} <br />
                <strong>{`${formData.district} - ${formData.pincode}` || 'Chennai - 600096.'}</strong> <br />
                <strong>{formData.state || 'Tamil Nadu'}</strong> <br />
                <strong>GSTIN :</strong> {formData.gstin || '33EEPPP3507A1ZQ'} <br />
                <strong>E-Mail :</strong> {formData.email || 'pradeepblinds@gmail.com'} <br />
                <strong>Mobile :</strong> {formData.mobileNumber || '+91 86086 15099'}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'grid',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: { xs: '8px', sm: '16px' },
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
                <div style={{ borderRight: '1px solid black', padding: '8px' }}>
                  <strong>Invoice No:</strong> <br />
                  {date.invoiceNo}
                </div>
                <div style={{ padding: '4px' }}>
                  <strong>Invoice Date:</strong> <br />
                  {date.invoiceDate}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
                <div style={{ borderRight: '1px solid black', padding: '8px' }}>
                  <strong>Ref No:</strong> <br />
                  {date.refNo}
                </div>
                <div style={{ padding: '4px' }}>
                  <strong>Ref Date:</strong> <br />
                  {date.refDate}
                </div>
              </div>
            </Grid>
          </Grid>

          {/* Bill To Section */}
          <Grid
            container
            sx={{
              borderBottom: '1px solid black',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                borderRight: { xs: 'none', sm: '2px solid black' },
                p: { xs: 1, sm: 2 },
              }}
            >
              <Typography variant="body2">
                <strong>Bill To:</strong> <br />
                <strong>{vendor.companyName || 'SRI RAM CONSTRUCTIONS'}</strong> <br />
                {vendor.address || '237A, 7th Street, Sempon Nagar, Perungudi,'} <br />
                <strong>{`${vendor.district} - ${vendor.pincode}` || 'Chennai - 600096.'}</strong> <br />
                <strong>{vendor.state || 'Tamil Nadu'}</strong> <br />
                <strong>GSTIN :</strong> {vendor.gstin || '33EEPPP3507A1ZQ'} <br />
                <strong>E-Mail :</strong> {vendor.emailId || 'pradeepblinds@gmail.com'} <br />
                <strong>Mobile :</strong> {vendor.mobilenumber || '+91 86086 15099'}
              </Typography>
            </Grid>
          </Grid>

          {/* Table Section */}
          <TableContainer
            component={Paper}
            sx={{
              borderBottom: '1px solid black',
              overflowX: 'auto', // Scroll horizontally on small screens
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', textAlign: 'center' }}>S.No</TableCell>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', textAlign: 'center' }}>
                    DESCRIPTION
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', textAlign: 'center' }}>QTY</TableCell>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', textAlign: 'center' }}>RATE</TableCell>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', textAlign: 'center' }}>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(amount.items) &&
                  amount.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{index + 1}</TableCell>
                      <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{item.description}</TableCell>
                      <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{item.qty}</TableCell>
                      <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>{item.rate}</TableCell>
                      <TableCell sx={{ border: '1px solid black', textAlign: 'center' }}>
                        {(item.qty * item.rate).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}
        >
          Download Invoice
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          sx={{ mt: 2, ml: { xs: 0, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
        >
          Back
        </Button>
      </Container>
    </>
  );
};

export default InvoiceTemplate;
