import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Tooltip,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [waitingPeriod, setWaitingPeriod] = useState(null);

  const data = [
    {
      date: "2023-06-30",
      v_no: "1234",
      for: "Service",
      team: "Team A",
      farmer_name: "Farmer 1",
      status: "delayed",
      mobile_no: "1234567890",
      payment_date: "2023-07-15",
      amount_payable: "1000",
      all_amount: "5000",
    },
    // Add more data as needed
  ];

  const calculateWaitingPeriod = () => {
    const currentDate = new Date();
    const paymentDate = new Date(data[0].payment_date);
    const diffTime = Math.abs(currentDate - paymentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setWaitingPeriod(diffDays);
  };

  const columns = useMemo(() => [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "v_no", header: "V No" },
    { accessorKey: "for", header: "For" },
    { accessorKey: "team", header: "Team" },
    { accessorKey: "farmer_name", header: "Farmer's Name" },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => {
        const status = cell.getValue();
        let color = "grey";
        if (status === "delayed") color = "red";
        if (status === "nil") color = "green";
        if (status === "waiting") color = "white";

        return (
          <Tooltip title={status}>
            <CircleIcon style={{ color }} />
          </Tooltip>
        );
      },
    },
    { accessorKey: "mobile_no", header: "Mobile No" },
    { accessorKey: "payment_date", header: "Payment Date" },
    { accessorKey: "amount_payable", header: "Amount Payable" },
    { accessorKey: "all_amount", header: "All Amount" },
    // {
    //   header: "Add Payment",
    //   Cell: ({ row }) => (
    //     <IconButton color="primary">
    //       <Tooltip title="Add Payment">
    //         <CircleIcon />
    //       </Tooltip>
    //     </IconButton>
    //   ),
    // },
    {
      header: "Add Payment",
      Cell: ({ row }) => (
        <IconButton color="primary" onClick={() => navigate("/addPayment")}>
          <Tooltip title="Add Payment">
            <AddIcon />
          </Tooltip>
        </IconButton>
      ),
    },
    { accessorKey: "payment_date", header: "Payment Date" },
  ], []);

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h6">Waiting Period: {waitingPeriod ? `${waitingPeriod} days` : "N/A"}</Typography>
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={calculateWaitingPeriod}>
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>
      <MaterialReactTable data={data} columns={columns} />
    </Box>
  );
};

export default PaymentDetails;
