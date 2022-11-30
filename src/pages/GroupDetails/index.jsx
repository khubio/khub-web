import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '@components/Header';
import { useState, useEffect } from 'react';
import { getGroupsOfUser, getGroupById } from '@services/group.service';
import { Link, useParams } from 'react-router-dom';
import { tokens } from '../../theme';

const GroupDetails = () => {
  const theme = useTheme();
  const [group, setGroup] = useState({
    name: '',
    id: '',
    users: [],
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await getGroupById(params.id);
      const users = res.users.map((user) => {
        return {
          id: user.user.id,
          role: user.role,
          firstName: user.user.firstName,
          lastName: user.user.lastName,
        };
      });
      res.users = users;
      setGroup(res);
    })();
  }, []);
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'User Id', flex: 1 },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
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
            // onClick={() => alert('wellll')}
          >
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              <Link to={`/groups/${id}`}>Details</Link>
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="GROUP DETAILS" subtitle={`Details of group: ${group.name}`} />
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
        }}
      >
        <DataGrid checkboxSelection rows={group.users} columns={columns} />
      </Box>
    </Box>
  );
};

export default GroupDetails;
