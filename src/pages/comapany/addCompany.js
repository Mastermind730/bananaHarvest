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
  TextField,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerMobile, setOwnerMobile] = useState("");
  const [paymentPerson, setPaymentPerson] = useState("");
  const [paymentPersonContact, setPaymentPersonContact] = useState("");
  const [gstin, setGstin] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [alias, setAlias] = useState("");
  const [charges, setCharges] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState([]);
  const user = useSelector((state) => state.user);

  const selectedTab = useSelector(
    (state) => state?.HandleUser?.value?.selectedTab
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await axios.get(config.serverURL + "/harvest/company", {
          headers: { token: sessionStorage["token"] },
        });
        const result = response.data;
        setCompany(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCompanies();
  }, []);

  const openDeleteConfirmModal = useCallback(async (row) => {
    try {
      const response = await axios.delete(config.serverURL + `/harvest/company/${company[row.index].company_name}`, {
        headers: { token: sessionStorage["token"] },
      });
      setCompany(prevCompanies => prevCompanies.filter(item => item.company_name !== company[row.index].company_name));
    } catch (error) {
      console.log('Error deleting company:', error);
    }
  }, [company]);

  const columns = useMemo(() => [
    { accessorKey: "company_name", header: "Company Name" ,size:200},
    { accessorKey: "company_address", header: "Company Address",size:200 },
    { accessorKey: "company_email", header: "Company Email",size:200 },
    { accessorKey: "owner_name", header: "Owner Name",size:200 },
    { accessorKey: "owner_mobile", header: "Owner Mobile",size:200 },
    { accessorKey: "payment_relatedperson", header: "Payment Person",size:200 },
    { accessorKey: "payment_relatedpersoncontact", header: "Payment Person Contact",size:180 },
    { accessorKey: "GSTIN", header: "GSTIN",size:200 },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ], [openDeleteConfirmModal]);
  // Redirect to unauthorized page if the user is not an admin
  useEffect(()=>{
    if (!user || user.role !== 'ADMIN'  || user.role !=="SUPERVISOR") {
      // <Unauthorized />;
      toast.error("Unauthorised Access")
     navigate("/home")
     // return <Unauthorized />;
   }
  })

  const AddCompany = () => {
    if (companyName.length === 0) {
      toast.error("Enter company name");
    } else if (companyEmail.length === 0) {
      toast.error("Enter company email");
    } else {
      const body = {
        companyName,
        companyAddress,
        companyEmail,
        ownerName,
        ownerMobile,
        paymentPerson,
        paymentPersonContact,
        gstin,
        ownerPassword,
        alias,
        charges,
      };
      
      axios
        .post(config.serverURL + "/harvest/company/add", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          const result = response.data;
          if (result.status === "success") {
            toast.success("Successfully added a new company");
            navigate("/addCompany");
          } else {
            toast.error(result.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const table = useMaterialReactTable({
    columns,
    data: company,
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
    <Box p={1}> 

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
          Add Company
        </Button>
      </Box>

      <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth>
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Mobile No"
                value={ownerMobile}
                onChange={(e) => setOwnerMobile(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Payment Related Person"
                value={paymentPerson}
                onChange={(e) => setPaymentPerson(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Payment Person Contact"
                value={paymentPersonContact}
                onChange={(e) => setPaymentPersonContact(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GSTIN"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner's Password"
                type="password"
                value={ownerPassword}
                onChange={(e) => setOwnerPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Charges"
                value={charges}
                onChange={(e) => setCharges(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={AddCompany} color="primary">
            Add Company
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ overflowX: 'auto' }}>
        <MRT_Table table={table} />
      </Box>
    </Box>
  );
};

export default ManageCompany;
