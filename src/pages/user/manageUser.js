import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import { setSelectedTab } from "../features/handleUser";

const ManageUser = () => {
  const [user_name, setUser_name] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);

  const selectedTab = useSelector(
    (state) => state?.HandleUser?.value?.selectedTab
  );

  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  const columns = useMemo(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
  ], []);

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
     // deleteUser(row.original.id);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddUser = () => {
    if (user_name.length === 0) {
      toast.error("Enter first name");
    } else if (mobile_no.length === 0) {
      toast.error("Enter mobile number");
    } else if (password.length === 0) {
      toast.error("Enter password");
    } else if (role.length === 0) {
      toast.error("Enter role of user");
    } else {
      const body = {
        user_name,
        mobile_no,
        password,
        role,
      };

      axios
        .post(config.serverURL + "/harvest/users/add", body, {
          headers: { token: sessionStorage["token"] },
        })
        .then((response) => {
          const result = response.data;
          if (result["status"] === "success") {
            toast.success("Successfully added a new user");
            navigate("/home");
            setOpen(false);
          } else {
            toast.error(result["error"]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <MaterialReactTable
            data={data}
            columns={columns}
            editDisplayMode="modal"
            enableEditing={true}
            renderTopToolbarCustomActions={() => (
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add User
              </Button>
            )}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mobile Number"
            type="number"
            fullWidth
            value={mobile_no}
            onChange={(e) => setMobile_no(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={AddUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUser;
