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
import { getPresentations, createPresentation } from '@services/presentation.service';
import { Link } from 'react-router-dom';
import { useMounted } from 'src/hooks/useMounted';
import { rolesInPresentation } from '@configs';
import RoleFilter from '@components/RoleFilter';
import { tokens } from '../../../theme';

const PresentationList = () => {
  const theme = useTheme();
  const [presentations, setPresentations] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPresentation, setNewPresentation] = useState('');
  const { isMounted } = useMounted();
  const [roles, setRoles] = useState(rolesInPresentation);

  const fetch = useCallback(() => {
    getPresentations(roles).then((data) => setPresentations(data));
  }, [isMounted]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Presentation Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'creator',
      headerName: 'Creator',
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
              <Link to={`/presentations/${id}`}>Details</Link>
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
    setNewPresentation('');
    setOpen(false);
  };
  const handleCreate = async () => {
    if (newPresentation.trim() === '') {
      return;
    }
    await createPresentation(newPresentation);
    setOpen(false);
    setNewPresentation('');
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
      <Header title="PRESENTATION" subtitle="All presentation you can access" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Presentation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new presentation, please enter presentation name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Presentation name"
            type="text"
            fullWidth
            variant="filled"
            color="info"
            onChange={(e) => setNewPresentation(e.target.value)}
            value={newPresentation}
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
        <RoleFilter roles={roles} onChange={handleChange} allRoles={rolesInPresentation} />
        <Button variant="outlined" color="info" onClick={handleOpen}>
          New Presentation
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
        <DataGrid checkboxSelection rows={presentations} columns={columns} />
      </Box>
    </Box>
  );
};

export default PresentationList;
