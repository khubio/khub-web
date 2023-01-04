import {
  Box,
  Typography,
  useTheme,
  Button,
  Input,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '@components/Header';
import { useState, useEffect, useCallback } from 'react';
import { getGroupById } from '@services/group.service';
import { useParams } from 'react-router-dom';
import { useMounted } from 'src/hooks/useMounted';
import { tokens } from '../../theme';

const GroupDetails = () => {
  const theme = useTheme();
  const [group, setGroup] = useState({
    name: '',
    id: '',
    users: [],
  });
  const [invitedEmail, setInvitedEmail] = useState('');
  const { isMounted } = useMounted();
  const params = useParams();
  const fetch = useCallback(() => {
    getGroupById(params.id).then((data) => {
      if (isMounted.current) {
        setGroup(data);
      }
    });
  }, [isMounted]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  useEffect(() => {
    fetch();
  }, [fetch]);

  const colors = tokens(theme.palette.mode);
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
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { role } }) => {
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
            {/* <ConfirmationDialogRaw roleInGroup={role} /> */}
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="GROUP DETAILS" subtitle={`Group name: ${group.name}`} />
      <form>
        <Box display="flex" justifyContent="flex-end" sx={{ p: '0' }}>
          <TextField
            label="Enter email to invite member to join this group"
            type="email"
            variant="filled"
            color="info"
            sx={{ width: '300px' }}
            onChange={(e) => setInvitedEmail(e.target.value)}
            value={invitedEmail}
          />
          <Button
            variant="outlined"
            color="info"
            sx={{ ml: '10px' }}
            onClick={() => alert(invitedEmail)}
          >
            Send
          </Button>
        </Box>
      </form>
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
        <DataGrid checkboxSelection rows={group.users} columns={columns} />
      </Box>
    </Box>
  );
};

export default GroupDetails;
