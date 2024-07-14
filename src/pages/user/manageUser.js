import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { MRT_Table, useMaterialReactTable } from 'material-react-table';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { setSelectedTab } from '../features/handleUser';

const ManageUser = () => {
  const [user_name, setUser_name] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const selectedTab = useSelector(
    (state) => state?.HandleUser?.value?.selectedTab
  );

  const roles = ['admin', 'supervisor', 'user'];

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'user_name', header: 'User Name' },
      { accessorKey: 'mobile_no', header: 'Mobile Number' },
      { accessorKey: 'role', header: 'Role' },
    ],
    []
  );

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(config.serverURL + '/harvest/users', {
          headers: { token: sessionStorage['token'] },
        });
        const { data } = response.data;
        setUsers(data); // Assuming data is an array of users
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);
  console.log(users)

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          headers: { token: sessionStorage['token'] },
        })
        .then((response) => {
          const result = response.data;
          if (result['status'] === 'success') {
            toast.success('Successfully added a new user');
            navigate('/home');
            setOpen(false);
          } else {
            toast.error(result['error']);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // deleteUser(row.original.id);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const table = useMaterialReactTable({
    columns,
    data: users, // Assuming users is the array of data fetched
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
    <div>
      <div className="row">
        {users.length===0?<p>No records to display.</p>:(<div className="col-lg-12 col-md-12 col-sm-12">
          {users.length!==0&&<MRT_Table table={table} />}
        </div>)}
        
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
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
          <FormControl fullWidth>
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
