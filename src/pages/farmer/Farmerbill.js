import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const FarmerBill = () => {
  const [showAdditionalColumns, setShowAdditionalColumns] = useState(false);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [farmerBill, setFarmerBill] = useState([]);

  useEffect(() => {
    const getFarmerBill = async () => {
      try {
        const response = await axios.get(
          config.serverURL + "/harvest/farmer_bill",
          {
            headers: { token: localStorage["token"] },
          }
        );
        const result = response.data;
        setFarmerBill(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFarmerBill();
  }, []);

  const handleShowAdditionalColumns = () => {
    setShowAdditionalColumns(!showAdditionalColumns);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNavigateToPaymentDetails = () => {
    navigate("/paymentDetails");
  };

  const filteredData =
    farmerBill.length === 0
      ? []
      : farmerBill.filter(
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
              Farmer Bill
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
                    {showAdditionalColumns && (
                      <>
                        <TableCell>Weight</TableCell>
                        <TableCell>Empty Box Weight</TableCell>
                        <TableCell>Subtotal Weight</TableCell>
                        <TableCell>Wastage</TableCell>
                        <TableCell>Net Weight</TableCell>
                        <TableCell>Total Weight</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Initial Amount</TableCell>
                        <TableCell>Labour Transport</TableCell>
                        <TableCell>Amount Payable</TableCell>
                        <TableCell>Main Box</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {farmerBill.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={showAdditionalColumns ? 12 : 5}
                        align="center"
                      >
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
                        {showAdditionalColumns && (
                          <>
                            <TableCell>{row.Weight}</TableCell>
                            <TableCell>{row.EmptyBox_weight}</TableCell>
                            <TableCell>{row.Subtotal_Weight}</TableCell>
                            <TableCell>{row.Wastage}</TableCell>
                            <TableCell>{row.Net_Weight}</TableCell>
                            <TableCell>{row.Total_Weight}</TableCell>
                            <TableCell>{row.Rate}</TableCell>
                            <TableCell>{row.Initial_Amount}</TableCell>
                            <TableCell>{row.Labour_Transport}</TableCell>
                            <TableCell>{row.Amount_Payable}</TableCell>
                            <TableCell>{row.Main_Box}</TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowAdditionalColumns}
              >
                {showAdditionalColumns
                  ? "Hide Additional Columns"
                  : "Show Additional Columns"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNavigateToPaymentDetails}
              >
                Payment Details
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FarmerBill;
