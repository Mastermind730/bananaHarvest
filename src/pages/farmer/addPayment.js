import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Paper, Typography, Grid } from "@mui/material";

const AddPayment = () => {
  const [farmerName, setFarmerName] = useState("");
  const [bankName, setBankName] = useState("");
  const [nameOnAccount, setNameOnAccount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission
    console.log({
      farmerName,
      bankName,
      nameOnAccount,
      mobileNumber,
      accountNumber,
      ifscCode,
      accountType,
    });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Add Payment Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Farmer's Name"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name on Account"
                value={nameOnAccount}
                onChange={(e) => setNameOnAccount(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="IFSC Code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Account Type"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <MenuItem value="saving">Saving</MenuItem>
                <MenuItem value="current">Current</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddPayment;
