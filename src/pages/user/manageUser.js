import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';
import {
  Grid,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { setSelectedTab } from '../features/handleUser';
// import Unauthorized from '../../components/unauthorised';
// 
const ManageUser = () => {
  const [user_name, setUser_name] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.authSlice.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roles = ['ADMIN', 'SUPERVISOR', 'ACCOUNTANT'];

  const columns = useMemo(
    () => [
      { accessorKey: 'user_name', header: 'User Name' },
      { accessorKey: 'mobile_no', header: 'Mobile Number' },
      { accessorKey: 'role', header: 'Role' },
    ],
    []
  );

  useEffect(() => {
    // Redirect to unauthorized page if the user is not an admin
    console.log(user)
    if (!user || user.role !== 'ADMIN') {
      navigate("/home");
      toast.error("Unauthorized Access");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(config.serverURL + '/harvest/users', {
          headers: { token: sessionStorage.getItem('token') },
        });
        const { data } = response.data;
        setUsers(data); // Assuming data is an array of users
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  const AddUser = () => {
    if (user_name.length === 0) {
      toast.error('Enter first name');
    } else if (mobile_no.length === 0) {
      toast.error('Enter mobile number');
    } else if (password.length === 0) {
      toast.error('Enter password');
    } else if (role.length === 0) {
      toast.error('Select role of user');
    } else {
      const body = {
        user_name,
        mobile_no,
        password,
        role,
      };

      axios
        .post(config.serverURL + '/harvest/users/add', body, {
          headers: { token: sessionStorage.getItem('token') },
        })
        .then((response) => {
          const result = response.data;
          if (result.status === 'success') {
            toast.success('Successfully added a new user');
            navigate('/manageUser');
            setOpen(false);
          } else {
            toast.error(result.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Perform delete action if confirmed
      // Example: deleteUser(row.original.id);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MaterialReactTable
            data={users}
            columns={columns}
            editDisplayMode="modal"
            enableEditing={true}
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
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                type="text"
                fullWidth
                value={user_name}
                onChange={(e) => setUser_name(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Mobile Number"
                type="number"
                fullWidth
                value={mobile_no}
                onChange={(e) => setMobile_no(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
    </Box>
  );
};

export default ManageUser;
