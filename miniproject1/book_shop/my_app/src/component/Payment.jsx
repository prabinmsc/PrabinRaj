import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

const Payment = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment details:', { name, phone });
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', height: '100vh',pt:"100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Payment Page
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please enter your payment information below.
      </Typography>

    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff'
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Payment Information
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Payment
      </Button>
    </Box>
    
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            By submitting, you agree to our Terms and Conditions.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            For any issues, please contact our support team.
            </Typography>
    </Box>
  );
};

export default Payment;
