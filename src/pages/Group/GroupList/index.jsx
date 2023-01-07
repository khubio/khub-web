import {
  Box,
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
import { useNavigate } from 'react-router-dom';
import { useMounted } from 'src/hooks/useMounted';
import { rolesInGroup } from '@configs';
import RoleFilter from '@components/RoleFilter';
import MenuAction from '@components/MenuAction';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from 'moment';
import { tokens } from '../../../theme';

const GroupList = () => {
  const theme = useTheme();
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [newGroup, setNewGroup] = useState('');
  const { isMounted } = useMounted();
  const [roles, setRoles] = useState(rolesInGroup);
  const navigate = useNavigate();

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

  const getMenuItemTop = (groupId, userRole) => {
    const menu = [
      {
        text: 'Details',
        onClick: () => navigate(`/groups/${groupId}`),
        key: 'Details',
        icon: <InfoOutlinedIcon fontSize="small" />,
      },
    ];
    if (userRole === 'owner') {
      menu.push({
        text: 'Rename',
        onClick: () => {},
        key: 'Rename',
        icon: <ModeEditOutlineOutlinedIcon fontSize="small" />,
      });
      menu.push({
        text: 'Share',
        onClick: () => {},
        key: 'share',
        icon: <ShareOutlinedIcon fontSize="small" />,
      });
    }
    return menu;
  };

  const getMenuItemDown = (groupId, userRole) => {
    if (userRole !== 'owner') {
      return [];
    }
    return [
      {
        text: 'Delete',
        onClick: () => {},
        key: 'Delete',
        icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
      },
    ];
  };

  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Group Name',
      flex: 2,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'role',
      headerName: 'Role in Group',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: ({ row: { createdAt } }) => moment(createdAt).fromNow(),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: ({ row: { updatedAt } }) => moment(updatedAt).fromNow(),
    },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      renderCell: ({ row: { id, role } }) => {
        return (
          <Box
            width="30%"
            m="5px"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
            sx={{ cursor: 'pointer' }}
          >
            <MenuAction
              menuItemTop={getMenuItemTop(id, role)}
              menuItemDown={getMenuItemDown(id, role)}
            />
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
      return;
    }
    await createGroup(newGroup);
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
        <RoleFilter
          roles={roles}
          onChange={handleChange}
          allRoles={rolesInGroup}
        />
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

export default GroupList;
