import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button } from '@mui/material';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

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
    console.log(itemDetails)
  }, [savedData]);

  const handleDone = () => {
    if (onDone) {
      onDone({ formData, vendor, date, bank, brand,invoiceData });
    }
  };

  // Function to trigger PDF download with improved quality
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

  // Function to go back to the previous page
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      <Container id="invoice-content" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <h2>Tax invoice</h2>
        <Box sx={{ minWidth: 700, border: '2px solid black' }}>
          {/* Header Section */}
          <Grid container sx={{ borderBottom: '2px solid black' }}>
            <Grid item xs={6} sx={{ borderRight: '2px solid black', p: 1 }}>
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

            <Grid item xs={6} sx={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid black', gap: '7px' }}>
                <div style={{ borderRight: '1px solid black', padding: '8px' }}>
                  <strong>Invoice No:</strong> <br />{date.invoiceNo}
                </div>
                <div style={{ padding: '4px' }}>
                  <strong>Invoice Date:</strong> <br />{date.invoiceDate}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
                <div style={{ borderRight: '1px solid black', padding: '8px' }}>
                  <strong>Ref No:</strong> <br />
                  {date.refNo}
                </div>
                <div style={{ padding: '4px' }}>
                  <strong>Ref Date:</strong> <br />{date.refDate}
                </div>
              </div>
            </Grid>
          </Grid>

          {/* Bill To Section */}
          <Grid container sx={{ borderBottom: '1px solid black' }}>
            <Grid item xs={6} sx={{ borderRight: '2px solid black', p: 1 }}>
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
            <Grid item xs={6} sx={{ p: 2 }}>
              <Typography variant="body2">&nbsp;</Typography>
            </Grid>
          </Grid>

          {/* Table Section */}
          <TableContainer component={Paper} sx={{ borderBottom: '1px solid black' }}>
            <Table size="small" sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', textAlign: 'center' }}> S.No</TableCell>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>DESCRIPTION</TableCell>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>QTY</TableCell>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>RATE</TableCell>
                  <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(amount.items) && amount.items.map((item, index)=>(
                  <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid black' }}> {index+1}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{item.description}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{item.qty}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{item.rate}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{item.qty * item.rate}</TableCell>
                  </ TableRow>
                ))}

                {/* <TableRow>
                  <TableCell sx={{ border: '1px solid black' }}> 1</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>Blinds Alteration</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>1</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>1000.00</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>1000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: '1px solid black' }}>2</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>Blinds Service</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>1</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>1000.00</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>1000.00</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ border: '1px solid black', fontWeight: 'bold' }}>SUB TOTAL</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{amount.subtotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ border: '1px solid black', fontWeight: 'bold' }}>CGST@{amount.gstRate}%</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{amount.cgst}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ border: '1px solid black', fontWeight: 'bold' }}>SGST@{amount.gstRate}%</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{amount.sgst}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ border: '1px solid black', fontWeight: 'bold' }}>
                    <strong>TOTAL IN INR</strong>
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>
                    <strong>{amount.total}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" sx={{ mt: 2, pl: 1 }}>
            <strong>Amount in Words:</strong> {amount.amountInWords || 'zero'}
          </Typography>

          {/* Footer Section */}
          <Grid container sx={{ borderTop: '2px solid black', mt: 2 }}>
            <Grid item xs={6} sx={{ borderRight: '2px solid black', p: 1 }}>
              <Typography variant="body2">
                <strong>Bank Account Details: </strong> <br />
                Account Name: {bank.accountName}<br />
                Account Number: {bank.accountNumber} <br />
                Bank Name: {bank.bankName || 'Indian Overseas Bank'} <br />
                IFSC Code: {bank.ifscCode || 'IFSC'}
              </Typography>
            </Grid>

            <Grid item xs={6} sx={{ p: 1, textAlign: 'end' }}>
              <Typography variant="body2">
                For <strong>{brand.brandName || 'PRATHI DÉCOR'}</strong>
              </Typography>
              <Box sx={{ mt: 7 }}>
                <Typography variant="body2">{brand.businessType || 'Proprietor'}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <br/>
        <br/><br/>
        <br/>
        <Typography>…Thank you for your business… </Typography>

       
      </Container>
      <Button variant="contained" color="primary" onClick={handleDownload} sx={{ mt: 2 }}>
          Download Invoice
        </Button>

        {/* Back Button */}
        <Button variant="contained" color="secondary" onClick={handleBack} sx={{ mt: 2, ml: 2 }}>
          Back
        </Button>
    </>
  );
};

export default InvoiceTemplate;
