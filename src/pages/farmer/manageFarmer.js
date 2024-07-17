import React, { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { setSelectedTab } from "../features/handleUser";
import { MRT_Table, useMaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageFarmer = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [geolocation, setGeolocation] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [farmerMobile, setFarmerMobile] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [laborName, setLaborName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rate, setRate] = useState("");
  const [weight, setWeight] = useState("");
  const [wastage, setWastage] = useState("");
  const [companyRate, setCompanyRate] = useState("");
  const [companyWastage, setCompanyWastage] = useState("");
  const [extraPayment, setExtraPayment] = useState("");
  const [boxTypes, setBoxTypes] = useState([{ boxKgType: "", emptyBoxWeight: "", boxCount: "", boxName: "" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const user = useSelector((state) => state.authSlice.user.user);

  const selectedTab = useSelector(
    (state) => state?.HandleUser?.value?.selectedTab
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddFarmer = () => {
    if (farmerName.length === 0) {
      toast.error("Enter farmer name");
    } else if (farmerMobile.length === 0 || Number(farmerMobile)<0 || farmerMobile.length!==10) {
      toast.error("Enter farmer mobile number");
    } 
    else if (location.length === 0) {
      toast.error("Enter farmer location ");
    } else {
      const body = {
        date,
        location,
        geolocation,
        farmerName: farmerName,
        farmerMobile: farmerMobile,
        vehicle_no: vehicleNo,
        labor_name: laborName,
        company_name: companyName,
        rate,
        weight,
        wastage,
        company_rate: companyRate,
        company_wastage: companyWastage,
        extra_payment: extraPayment,
        box_types: boxTypes,
      };

      axios
        .post(config.serverURL + "/harvest/farmers/add", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result["status"] === "success") {
            setIsModalOpen(false)
            toast.success("Successfully added a new farmer");
            navigate("/manageFarmer");
          } else {
            toast.error(result["error"]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const getFarmers = async () => {
      try {
        const response = await axios.get(config.serverURL + "/harvest/farmers", {
          headers: { token: sessionStorage["token"] },
        });
        const { data } = response.data;
        setFarmers(data);
      } catch (error) {
        console.log("Error fetching farmers:", error);
      }
    };
    getFarmers();
  }, []);
  console.log(farmers)

  // Redirect to unauthorized page if the user is not an admin
  useEffect(() => {
    console.log(user);
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPERVISOR")) {
      toast.error("Unauthorized Access");
      navigate("/home");
    }
  }, [user, navigate]);
  
  const openDeleteConfirmModal = useCallback(async (row) => {
    // if (window.confirm('Are you sure you want to delete this farmer?')) {
      

      try {
        console.log((farmers[row.index]).mobile_no);
        const response = await axios.get(config.serverURL + `/harvest/farmers/${(farmers[row.index]).mobile_no}`, {
          headers: { token: sessionStorage["token"] },
        });
        console.log(response);
        // console.log(farmers[row.original.id].mobile_no);
        setFarmers(prevFarmers => prevFarmers.filter(farmer => farmer.mobile_no !== (farmers[row.index]).mobile_no));

        // Update your state or handle response as needed
        // setFarmers(response.data);
      } catch (error) {
        console.log('Error deleting farmer:', error);
      }
    // }
  }, [farmers]);

  const columns = useMemo(() => [
    { accessorKey: "farmer_name", header: "Farmer Name" },
    { accessorKey: "mobile_no", header: "Farmer Mobile" },
    { accessorKey: "location", header: "Location" },
    {
      accessorKey: "delete",
      header: "Delete",
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ], [openDeleteConfirmModal]);

  const handleAddBoxType = () => {
    setBoxTypes([...boxTypes, { boxKgType: "", emptyBoxWeight: "", boxCount: "", boxName: "" }]);
  };

  const handleRemoveBoxType = (index) => {
    const newBoxTypes = [...boxTypes];
    
    newBoxTypes.splice(index, 1);
    setBoxTypes(newBoxTypes);
  };

  const handleBoxTypeChange = (index, field, value) => {
    const newBoxTypes = [...boxTypes];
    newBoxTypes[index][field] = value;
    setBoxTypes(newBoxTypes);
  };

  const handleModalOpen = () => {
    setBoxTypes([{ boxKgType: "", emptyBoxWeight: "", boxCount: "", boxName: "" }]);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    
    setIsModalOpen(false);
  };

  const table = useMaterialReactTable({
    columns,
    data: farmers, // Assuming users is the array of data fetched
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default,
    }),
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        caption: {
          captionSide: 'top',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        fontStyle: 'italic',
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        color: '#333',
        padding: '8px',
        textAlign: 'center',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        padding: '8px',
        textAlign: 'center',
      },
    },
    renderCaption: ({ table }) =>
      `Table with ${table.getRowModel().rows.length} rows.`,
  });

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Manage Farmers
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
          Add Farmer
        </Button>
      </Box>

      <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth maxWidth="md">
        <DialogTitle>Add Farmer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
  <TextField
    fullWidth
    label="Location"
    required
    InputLabelProps={{
      shrink: true,
      style: { color: 'red' }, // Change label color to red
    }}
    onChange={(e) => setLocation(e.target.value)}
  />
</Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Geolocation"
                onChange={(e) => setGeolocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Farmer Name"
                InputLabelProps={{
                  shrink: true,
                  style: { color: 'red' }, // Change label color to red
                }}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Farmer Mobile No"
                InputLabelProps={{
                  shrink: true,
                  style: { color: 'red' }, // Change label color to red
                }}
                onChange={(e) => setFarmerMobile(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Vehicle No"
                onChange={(e) => setVehicleNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Labor Name"
                onChange={(e) => setLaborName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Rate"
                onChange={(e) => setRate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Weight"
                onChange={(e) => setWeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Wastage"
                onChange={(e) => setWastage(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company Rate"
                onChange={(e) => setCompanyRate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company Wastage"
                onChange={(e) => setCompanyWastage(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Extra Payment"
                onChange={(e) => setExtraPayment(e.target.value)}
              />
            </Grid>
            {boxTypes.map((boxType, index) => (
  <React.Fragment key={index}>
    <Grid item xs={6}>
      <InputLabel htmlFor={`boxKgType-${index}`}>Box</InputLabel>
      <Select
        fullWidth
        value={boxType.boxKgType}
        onChange={(e) => handleBoxTypeChange(index, 'boxKgType', e.target.value)}
        inputProps={{
          id: `boxKgType-${index}`,
        }}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="7">7</MenuItem>
        <MenuItem value="13">13</MenuItem>
        <MenuItem value="13.5">13.5</MenuItem>
        <MenuItem value="14">14</MenuItem>
        <MenuItem value="16">16</MenuItem>
        <MenuItem value="18">18</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </Select>
    </Grid>
    {boxType.boxKgType && boxType.boxKgType !== 'custom' && (
      <>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Box Count"
            value={boxType.boxCount}
            onChange={(e) => handleBoxTypeChange(index, 'boxCount', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Box Name"
            value={boxType.boxName}
            onChange={(e) => handleBoxTypeChange(index, 'boxName', e.target.value)}
          />
        </Grid>
      </>
    )}
    {boxType.boxKgType === 'custom' && (
      <>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Box Kg Type"
            value={boxType.boxKgType}
            onChange={(e) => handleBoxTypeChange(index, 'boxKgType', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Empty Box Weight"
            value={boxType.emptyBoxWeight}
            onChange={(e) => handleBoxTypeChange(index, 'emptyBoxWeight', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Box Count"
            value={boxType.boxCount}
            onChange={(e) => handleBoxTypeChange(index, 'boxCount', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Box Name"
            value={boxType.boxName}
            onChange={(e) => handleBoxTypeChange(index, 'boxName', e.target.value)}
          />
        </Grid>
      </>
    )}
    {index > 0 && (
      <Grid item xs={6}>
        <Tooltip title="Remove this box">
          <IconButton color="secondary" onClick={() => handleRemoveBoxType(index)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    )}
  </React.Fragment>
))}

            <Grid item xs={12}>
              <Tooltip title="Add more boxes">
                <IconButton color="primary" onClick={handleAddBoxType}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={AddFarmer} color="primary">
            Add Farmer
          </Button>
        </DialogActions>
      </Dialog>

      <Box mt={3} sx={{ overflowX: 'auto' }}>
        <MRT_Table table={table} />
      </Box>
    </div>
  );
};

export default ManageFarmer;
