import {
  Box,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '@components/Header';
import { useState, useEffect, useCallback } from 'react';
import { getGroupsOfUser, createGroup } from '@services/group.service';
import { Link } from 'react-router-dom';
import { useMounted } from 'src/hooks/useMounted';
import { rolesInGroup } from '@constants/rolesInGroup';
import RoleFilter from '@components/RoleFilter';
import { tokens } from '../../theme';

const Group = () => {
  const theme = useTheme();
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [newGroup, setNewGroup] = useState('');
  const { isMounted } = useMounted();
  const [roles, setRoles] = useState(rolesInGroup);

  const fetch = useCallback(() => {
    getGroupsOfUser(roles).then((data) => {
      if (isMounted.current) {
        setGroups(data);
      }
    });
  }, [isMounted, roles]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Group Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="30%"
            m="5px auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[700]}
            borderRadius="4px"
            sx={{ cursor: 'pointer' }}
          >
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              <Link to={`/groups/${id}`}>Details</Link>
            </Typography>
          </Box>
        );
      },
    },
  ];
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setNewGroup('');
    setOpen(false);
  };
  const handleCreate = async () => {
    if (newGroup.trim() === '') {
      console.log('Please enter group name');
      return;
    }
    await createGroup({ name: newGroup });
    setOpen(false);
    setNewGroup('');
    fetch();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    const chosenRoles = typeof value === 'string' ? value.split(',') : value;
    if (chosenRoles?.length) {
      setRoles(chosenRoles);
    }
  };

  return (
    <Box m="20px">
      <Header title="GROUP" subtitle="All group you have joined" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new group, please enter group name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group name"
            type="text"
            fullWidth
            variant="filled"
            color="info"
            onChange={(e) => setNewGroup(e.target.value)}
            value={newGroup}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="info">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="space-between" sx={{ p: '0' }}>
        <RoleFilter roles={roles} onChange={handleChange} />
        <Button variant="outlined" color="info" onClick={handleOpen}>
          New Group
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus':
            {
              outline: 'none !important',
            },
        }}
      >
        <DataGrid checkboxSelection rows={groups} columns={columns} />
      </Box>
    </Box>
  );
};

export default Group;
