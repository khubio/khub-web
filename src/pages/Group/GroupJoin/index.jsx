import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Box,
  Typography,
  Alert,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '@components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { groupJoin, joinGroup } from '@services/group.service';
import { useParams, useNavigate } from 'react-router-dom';
import { tokens } from '../../../theme';

const GroupJoin = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [info, setInfo] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    groupJoin(params.id).then((res) => {
      if (res.isJoinedGroup) {
        navigate(`/groups/${params.id}`);
      } else {
        setGroupName(res.group.name);
        setOpen(true);
      }
    });
  }, []);
  const columns = [
    { field: 'id', headerName: 'User Id', flex: 1 },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      renderCell: () => {
        return (
          <Box
            width="30%"
            m="5px"
            p="5px"
            display="flex"
            // backgroundColor={colors.greenAccent[700]}
            borderRadius="4px"
            sx={{ cursor: 'pointer' }}
          >
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              ...
            </Typography>
          </Box>
        );
      },
    },
  ];
  const handleClick = async () => {
    joinGroup(params.id).then(() => {
      setInfo(true);
      setTimeout(() => {
        setInfo(false);
        setTimeout(() => {
          navigate(`/groups/${params.id}`);
        }, 500);
      }, 1500);
    });
  };
  return (
    <Box m="20px">
      <Header title="GROUP DETAILS" subtitle={`Group name: ${groupName}`} />
      <Dialog open={open}>
        <DialogTitle>{`Invite to join group: ${groupName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join this group, please click the below button
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px', justifyContent: 'flex-end' }}>
          <Button onClick={handleClick} color="info" variant="contained">
            Join group
          </Button>
        </DialogActions>
        {info && <Alert severity="success">Joined this group</Alert>}

      </Dialog>
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
        <DataGrid checkboxSelection rows={[]} columns={columns} />
      </Box>
    </Box>
  );
};

export default GroupJoin;
