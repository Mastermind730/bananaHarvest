import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import config from "../../config";

const CompanyBill = () => {
  const [filter, setFilter] = useState("");
  const [companyBill, setCompanyBill] = useState([]);

  useEffect(() => {
    const getCompanyBill = async () => {
      try {
        const response = await axios.get(
          config.serverURL + "/harvest/company_bill",
          {
            headers: { token: localStorage["token"] },
          }
        );
        const result = response.data;
        setCompanyBill(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCompanyBill();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = companyBill.filter(
    (row) =>
      row.Date.includes(filter) ||
      row.Vehicle_Number.toLowerCase().includes(filter.toLowerCase()) ||
      row.Company_Name.toLowerCase().includes(filter.toLowerCase()) ||
      row.LabourTeam_Name.toLowerCase().includes(filter.toLowerCase()) ||
      row.Farmer_Name.toLowerCase().includes(filter.toLowerCase())
  );

  const getRowBackgroundColor = (index) => {
    return index % 2 === 0 ? "#f0f0f0" : "white"; // Alternating row colors
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Company Bill
            </Typography>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Filter"
                value={filter}
                onChange={handleFilterChange}
              />
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Vehicle No</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Farmer's Name</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Empty Box Weight</TableCell>
                    <TableCell>Subtotal Weight</TableCell>
                    <TableCell>Wastage</TableCell>
                    <TableCell>Net Weight</TableCell>
                    <TableCell>Danda</TableCell>
                    <TableCell>Total Weight</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Initial Amount</TableCell>
                    <TableCell>Labour Transport</TableCell>
                    <TableCell>Amount Payable</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={16} align="center">
                        No records to display
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((row, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor: getRowBackgroundColor(index),
                        }}
                      >
                        <TableCell>{row.Date}</TableCell>
                        <TableCell>{row.Vehicle_Number}</TableCell>
                        <TableCell>{row.Company_Name}</TableCell>
                        <TableCell>{row.LabourTeam_Name}</TableCell>
                        <TableCell>{row.Farmer_Name}</TableCell>
                        <TableCell>{row.Weight}</TableCell>
                        <TableCell>{row.EmptyBox_weight}</TableCell>
                        <TableCell>{row.Subtotal_Weight}</TableCell>
                        <TableCell>{row.Wastage}</TableCell>
                        <TableCell>{row.Net_Weight}</TableCell>
                        <TableCell>{row.Danda}</TableCell>
                        <TableCell>{row.Total_Weight}</TableCell>
                        <TableCell>{row.Rate}</TableCell>
                        <TableCell>{row.Initial_Amount}</TableCell>
                        <TableCell>{row.Labour_Transport}</TableCell>
                        <TableCell>{row.Amount_Payable}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyBill;
