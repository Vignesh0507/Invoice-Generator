import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Button } from '@mui/material';
import { FaTrash } from 'react-icons/fa'; // Importing trash icon from React Icons
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from React Router

const InvoiceComponent = () => {
  const [items, setItems] = useState([
    { description: 'Blinds Alteration', qty: 1, rate: 1000.0 },
    { description: 'Blinds Service', qty: 1, rate: 1000.0 },
  ]);
  const [gstRate, setGstRate] = useState(9); // GST rate is now editable
  const [useIgst, setUseIgst] = useState(false); // Toggle between IGST and CGST/SGST
  const navigate = useNavigate(); // Initialize navigate function

  // Calculate amounts and total
  const calculateAmount = (qty, rate) => qty * rate;
  const subtotal = items.reduce((total, item) => total + calculateAmount(item.qty, item.rate), 0);
  const cgst = useIgst ? 0 : (subtotal * gstRate) / 100;
const sgst = useIgst ? 0 : (subtotal * gstRate) / 100;
const igst = useIgst ? (subtotal * gstRate * 2) / 100 : 0;
const total = (subtotal || 0) + (cgst || 0) + (sgst || 0) + (igst || 0);
  // Convert number to words (supports larger numbers up to crore)
  const convertToWords = (num) => {
    const a = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const numToWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) {
        const tens = Math.floor(n / 10);
        const ones = n % 10;
        return b[tens] + (ones > 0 ? ' ' + a[ones] : '');
      }
      if (n < 1000) {
        const hundreds = Math.floor(n / 100);
        const remainder = n % 100;
        return a[hundreds] + ' Hundred' + (remainder > 0 ? ' and ' + numToWords(remainder) : '');
      }
      if (n < 100000) {
        const thousands = Math.floor(n / 1000);
        const remainder = n % 1000;
        return numToWords(thousands) + ' Thousand' + (remainder > 0 ? ' ' + numToWords(remainder) : '');
      }
      if (n < 10000000) {
        const lakhs = Math.floor(n / 100000);
        const remainder = n % 100000;
        return numToWords(lakhs) + ' Lakh' + (remainder > 0 ? ' ' + numToWords(remainder) : '');
      }
      if (n < 1000000000) {
        const crores = Math.floor(n / 10000000);
        const remainder = n % 10000000;
        return numToWords(crores) + ' Crore' + (remainder > 0 ? ' ' + numToWords(remainder) : '');
      }
      return 'Number too large';
    };

    return numToWords(num);
  };

  // Convert total to words
  const amountInWords = () => {
    if (isNaN(total) || total === 0) return 'Zero Only';

    const integerPart = Math.floor(total);
    const decimalPart = Math.round((total - integerPart) * 100); // Handle two decimal places (paise)

    const integerWords = convertToWords(integerPart);
    const decimalWords = decimalPart ? `${convertToWords(decimalPart)} Paise` : '';

    return `${integerWords} Only${decimalWords ? ' and ' + decimalWords : ''}`;
  };

  // Handle input changes for item fields
  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Add a new row with default values
  const handleAddItem = () => {
    setItems([
      ...items,
      { description: 'New Item', qty: 1, rate: 1000.0 }, // Default new row values
    ]);
  };

  // Remove an item from the list
  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Handle save information
  const handleSaveInformation = () => {
    const invoiceData = {
      items,
      gstRate,
      useIgst,
      subtotal,
      cgst,
      sgst,
      igst,
      total,
      amountInWords: amountInWords(),
    };
    // Save data to localStorage or API call (can replace with any storage method)
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Invoice
      </Typography>

      {/* GST Toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginRight: 2 }}>
          GST Rate (%):
        </Typography>
        <TextField
          type="number"
          value={gstRate}
          onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
          size="small"
          sx={{ marginRight: 2 }}
        />

        {/* IGST Rate Input */}
        <Typography variant="body1" sx={{ marginRight: 2 }}>
          IGST Rate (%):
        </Typography>
        <TextField
          type="number"
          value={gstRate * 2} // Default IGST is double of GST
          onChange={(e) => setUseIgst(true)} // If IGST is modified, toggle IGST mode
          size="small"
          disabled
          sx={{ marginRight: 2 }}
        />

        {/* Switch GST Type */}
        <Button
          variant="outlined"
          onClick={() => setUseIgst(!useIgst)}
        >
          {useIgst ? 'Switch to CGST/SGST' : 'Switch to IGST'}
        </Button>
      </Box>

      {/* Itemized Table */}
      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table>
          <TableBody>
            {/* Table Header */}
            <TableRow>
              <TableCell><strong>S.No</strong></TableCell>
              <TableCell><strong>DESCRIPTION</strong></TableCell>
              <TableCell><strong>QTY</strong></TableCell>
              <TableCell><strong>RATE</strong></TableCell>
              <TableCell><strong>AMOUNT</strong></TableCell>
              <TableCell><strong>ACTION</strong></TableCell>
            </TableRow>

            {/* Table Rows for Items */}
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    value={item.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleInputChange(index, 'qty', parseInt(e.target.value) || 0)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleInputChange(index, 'rate', parseFloat(e.target.value) || 0)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>{calculateAmount(item.qty, item.rate).toFixed(2)}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleRemoveItem(index)}>
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {/* Subtotal, GST, and Total */}
            <TableRow>
              <TableCell colSpan={4} align="right"><strong>SUB TOTAL</strong></TableCell>
              <TableCell>{subtotal.toFixed(2)}</TableCell>
              <TableCell />
            </TableRow>

            {/* Conditional rows for CGST/SGST or IGST */}
            {!useIgst && (
              <>
                <TableRow>
                  <TableCell colSpan={4} align="right"><strong>CGST@{gstRate}%</strong></TableCell>
                  <TableCell>{cgst.toFixed(2)}</TableCell>
                  <TableCell />
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right"><strong>SGST@{gstRate}%</strong></TableCell>
                  <TableCell>{sgst.toFixed(2)}</TableCell>
                  <TableCell />
                </TableRow>
              </>
            )}

            {useIgst && (
              <TableRow>
                <TableCell colSpan={4} align="right"><strong>IGST@{gstRate * 2}%</strong></TableCell>
                <TableCell>{igst.toFixed(2)}</TableCell>
                <TableCell />
              </TableRow>
            )}

            <TableRow>
              <TableCell colSpan={4} align="right"><strong>TOTAL IN INR</strong></TableCell>
              <TableCell>{total.toFixed(2)}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Amount in Words */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Amount in Words: {amountInWords()}
      </Typography>

      {/* Buttons */}
      <Typography sx={{ display: 'flex', gap: 5 }}>
        <Button variant="outlined" color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveInformation}>
          Save All Information
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Typography>
    </Box>
  );
};

export default InvoiceComponent;
