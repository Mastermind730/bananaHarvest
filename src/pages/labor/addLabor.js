import { useState, useMemo, useCallback, useEffect } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { toast } from "react-toastify";
import {  useDispatch, useSelector } from "react-redux";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { MRT_Table, useMaterialReactTable } from 'material-react-table';
import {
  Box,
  IconButton,
  Tooltip,
  Modal,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ManageLabor = () => {
  const [labor_name, setLabor_name] = useState("");
  const [labor_mobile, setLabor_mobile] = useState("");
  const [team_contractor, setTeam_contractor] = useState("");
  const [contractor_mobile, setContractor_mobile] = useState("");
  const [open, setOpen] = useState(false);
  const [labors, setLabors] = useState([]);
  const user = useSelector((state) => state.authSlice.user.user);

  const navigate = useNavigate();




  useEffect(()=>{
    const getLabors=async ()=>{
      try {
        const response = await axios.get(config.serverURL + "/harvest/labours", {
          headers: { token: sessionStorage["token"] },
        });
        const result = response.data.data;
        // console.log(result);
        const laborsWithId = result.map((labor, index) => ({
          ...labor,
          id: labor.labor_id || index + 1, // Use labor_id if exists, otherwise use index as id
        }));

        setLabors(laborsWithId)
        // setLabors(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getLabors();

  })
  // Redirect to unauthorized page if the user is not an admin
  useEffect(() => {
    console.log(user);
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPERVISOR")) {
      toast.error("Unauthorized Access");
      navigate("/home");
    }
  }, [user, navigate]);


//  console.log(labors)
 const handleDelete = useCallback(async (row) => {
  console.log("Delete labor with id:", row.index);
  try {
    console.log((labors[row.index]).labour_mobile);
    const response = await axios.delete(config.serverURL + `/harvest/labours/${(labors[row.index]).labour_mobile}`, {
      headers: { token: sessionStorage["token"] },
    });
    console.log(response);
    // console.log(farmers[row.original.id].mobile_no);
    setLabors(prevLabors => prevLabors.filter(item => item.labour_mobile !== labors[row.index].labour_mobile));

    // Update your state or handle response as needed
    // setFarmers(response.data);
  } catch (error) {
    console.log('Error deleting company:', error);
  }
  // Add your delete logic here, for example, make an API call to delete the labor
},[labors]);
console.log(labors)
 const openDeleteConfirmModal = useCallback(async (row) => {
  if (window.confirm('Are you sure you want to delete this labor?')) {
    handleDelete(row);
  }
},[handleDelete]);

  const columns = useMemo(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "labour_name", header: "Name" },
    { accessorKey: "labour_mobile", header: "Mobile" },
    { accessorKey: "contractor_name", header: "Contractor Name" },
    {
      header: "Actions",
      id: "actions",
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
  ], [openDeleteConfirmModal]);



  const dispatch = useDispatch();

  const AddLabor = () => {
    if (labor_name.length === 0) {
      toast.error("Enter labor name");
    } else if (labor_mobile.length === 0) {
      toast.error("Enter labor mobile number");
    } else if (team_contractor.length === 0) {
      toast.error("Enter team contractor");
    } else if (contractor_mobile.length === 0) {
      toast.error("Enter contractor mobile number");
    }  else {
      const body = {
        labor_name,
        labor_mobile,
        team_contractor,
        contractor_mobile,
      };
      console.log(body);
      axios
        .post(config.serverURL + "/harvest/labours/add", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result["status"] === "success") {
            toast.success("Successfully added new labor");
            navigate("/manageLabor");
          } else {
            toast.error(result["error"]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: labors, // Assuming users is the array of data fetched
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box sx={{ p: 2, maxWidth: 1000, mx: "auto" }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Tooltip title="Add Labor">
            <IconButton color="primary" onClick={handleOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
        <MRT_Table table={table} />
        </Box>
        </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Labor
          </Typography>
          <Input
            title="Labor Name"
            onChange={(e) => {
              setLabor_name(e.target.value);
            }}
          />
          <Input
            type="number"
            title="Labor Mobile"
            onChange={(e) => {
              setLabor_mobile(e.target.value);
            }}
          />
          <Input
            title="Team Contractor"
            onChange={(e) => {
              setTeam_contractor(e.target.value);
            }}
          />
          <Input
            type="number"
            title="Contractor's Mobile No"
            onChange={(e) => {
              setContractor_mobile(e.target.value);
            }}
          />
          <Button onClick={AddLabor} title="Add Labor" />
        </Box>
      </Modal>
    </div>
  );
};

export default ManageLabor;
